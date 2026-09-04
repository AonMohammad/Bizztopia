# 🚀 Bizztopia Turnkey Production Go-Live Guide

Everything is pre-packaged and automated inside the `deploy/` directory.

---

## ⚡ Option A: One-Click Linux Server Setup (Ubuntu / Debian VPS)

Connect to your server:
```bash
ssh root@YOUR_SERVER_IP
```

Run this single command to provision Nginx, PHP 8.3, Node.js, Composer, Cron, and SSL:
```bash
bash /var/www/bizztopia/deploy/SERVER_SETUP_ONE_CLICK.sh
```

Then run the automated deploy script:
```bash
cd /var/www/bizztopia && bash deploy/deploy.sh
```

Your platform will be **live immediately** on your server IP / domain!

---

## 🐳 Option B: One-Command Docker Go-Live

If you prefer Docker:
```bash
cd deploy && docker compose up -d --build
```

---

## 🔒 Free Automatic SSL (HTTPS) with Let's Encrypt

When your domain is pointed to your server IP, run:
```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## ⚙️ Automated Daily 50-Article Ingestion & Rewriting

Cron is automatically configured in `deploy/crontab.txt` to run the rewriter daily at 06:00 AM UTC:
```bash
# Manual test at any time:
php artisan cap:sync-rss
```
