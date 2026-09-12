#!/usr/bin/env bash
# ==============================================================================
# Bizztopia Master CAP - Production Deployment Script
# Automatically configures environment, runs migrations, caches assets,
# optimizes Laravel, and restarts PHP-FPM / Nginx / Supervisor.
# ==============================================================================

set -e

echo "🚀 [1/7] Starting Bizztopia Production Deployment..."

# 1. Ensure we are in project root
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

# 2. Environment Verification
if [ ! -f .env ]; then
    echo "⚠️ .env file missing! Creating from .env.example..."
    cp .env.example .env
    php artisan key:generate --force
fi

# Set production flags in .env
sed -i 's/^APP_ENV=.*/APP_ENV=production/' .env
sed -i 's/^APP_DEBUG=.*/APP_DEBUG=false/' .env

# Ensure PHP 8.4 is active for Laravel 13
if ! php -r 'exit(version_compare(PHP_VERSION, "8.4.0", ">=") ? 0 : 1);'; then
    echo "⚡ Upgrading server to PHP 8.4..."
    export DEBIAN_FRONTEND=noninteractive
    add-apt-repository -y ppa:ondrej/php || true
    apt-get update -y
    apt-get install -y php8.4 php8.4-fpm php8.4-cli php8.4-common php8.4-sqlite3 php8.4-curl \
        php8.4-mbstring php8.4-xml php8.4-zip php8.4-bcmath php8.4-intl php8.4-gd
    update-alternatives --set php /usr/bin/php8.4 || true
    sed -i 's/php8\.[0-3]-fpm\.sock/php8.4-fpm.sock/g' /etc/nginx/sites-available/* 2>/dev/null || true
    sed -i 's/php8\.[0-3]-fpm\.sock/php8.4-fpm.sock/g' /etc/nginx/sites-enabled/* 2>/dev/null || true
    systemctl restart php8.4-fpm 2>/dev/null || true
    systemctl reload nginx 2>/dev/null || true
fi

# 3. Install PHP Dependencies (No Dev)
echo "📦 [2/7] Installing Composer production dependencies..."
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction --ignore-platform-reqs

# 4. Storage & Database Setup
echo "🗄️ [3/7] Setting up database and running migrations..."
mkdir -p database storage/logs storage/framework/{cache,sessions,views}
touch database/database.sqlite
php artisan migrate --force

# 5. Build Frontend Assets & Clean Dev Flags
echo "🎨 [4/7] Compiling production frontend bundle..."
if command -v npm &> /dev/null; then
    npm install --legacy-peer-deps
    npm run build
fi
rm -f public/hot

# 6. Optimize Laravel Caches
echo "⚡ [5/7] Optimizing Laravel routing, config, and view caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 7. File Permissions
echo "🔒 [6/7] Securing storage & bootstrap cache permissions..."
chown -R www-data:www-data storage bootstrap/cache database 2>/dev/null || chmod -R 775 storage bootstrap/cache database

# 8. Reload Services if available
echo "🔄 [7/7] Reloading web services..."
if command -v systemctl &> /dev/null; then
    systemctl reload nginx 2>/dev/null || true
    systemctl reload php8.2-fpm 2>/dev/null || systemctl reload php8.3-fpm 2>/dev/null || true
fi

echo "=============================================================================="
echo "✅ BIZZTOPIA PLATFORM IS LIVE & OPTIMIZED FOR PRODUCTION!"
echo "=============================================================================="
