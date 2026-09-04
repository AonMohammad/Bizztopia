#!/usr/bin/env bash
# ==============================================================================
# Bizztopia One-Click Server Provisioner (Ubuntu 22.04 / 24.04 LTS & Debian)
# Run as root: bash SERVER_SETUP_ONE_CLICK.sh
# ==============================================================================

set -e

DOMAIN="${1:-bizztopia.com}"
APP_DIR="/var/www/bizztopia"

echo "=============================================================================="
echo "⚡ PROVISIONING BIZZTOPIA PRODUCTION ENVIRONMENT ON $(hostname -I | awk '{print $1}')"
echo "🌐 Domain / IP: $DOMAIN"
echo "=============================================================================="

# 1. Update and install base tools
export DEBIAN_FRONTEND=noninteractive
apt-get update -y && apt-get upgrade -y
apt-get install -y curl wget git unzip zip supervisor nginx certbot python3-certbot-nginx \
    software-properties-common sqlite3 libsqlite3-dev

# 2. Add PHP repository and install PHP 8.3
add-apt-repository -y ppa:ondrej/php || true
apt-get update -y
apt-get install -y php8.3 php8.3-fpm php8.3-cli php8.3-common php8.3-sqlite3 php8.3-curl \
    php8.3-mbstring php8.3-xml php8.3-zip php8.3-bcmath php8.3-intl php8.3-gd

# 3. Install Composer
if ! command -v composer &> /dev/null; then
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
fi

# 4. Install Node.js 20 & NPM
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi

# 5. Create app directory & permissions
mkdir -p "$APP_DIR"
cd "$APP_DIR"

# 6. Configure Nginx Virtual Host
cat > /etc/nginx/sites-available/bizztopia << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name _;
    root /var/www/bizztopia/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    index index.php index.html;
    charset utf-8;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/json application/javascript;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Static Asset Caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff2|woff|ttf|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }
}
EOF

ln -sf /etc/nginx/sites-available/bizztopia /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

# 7. Configure Crontab for Bizztopia (Runs every minute & triggers 50 articles daily sync)
(crontab -l 2>/dev/null | grep -v "artisan schedule:run" ; echo "* * * * * cd $APP_DIR && php artisan schedule:run >> /dev/null 2>&1") | crontab -
(crontab -l 2>/dev/null | grep -v "artisan cap:sync-rss" ; echo "0 6 * * * cd $APP_DIR && php artisan cap:sync-rss >> /var/log/bizztopia_rss.log 2>&1") | crontab -

echo "=============================================================================="
echo "🎉 SERVER PROVISIONING COMPLETE!"
echo "👉 Place your Bizztopia files in: $APP_DIR"
echo "👉 Run: cd $APP_DIR && bash deploy/deploy.sh"
echo "👉 Access live at: http://$(hostname -I | awk '{print $1}')"
echo "=============================================================================="
