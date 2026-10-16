# Deploy Forever Events on an OVH VPS

Use a VPS (2 vCPU / 4 GB / 40 GB, Ubuntu 24.04). This is not OVH “web hosting” (PHP). Requests stay on the server in `data/*.json`.

## 1. On the VPS (once)

```bash
sudo apt update && sudo apt install -y nginx git
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

## 2. App

```bash
sudo mkdir -p /var/www
sudo git clone YOUR_REPO_URL /var/www/forever-events
cd /var/www/forever-events
sudo npm ci
sudo cp .env.example .env
sudo nano .env   # set ADMIN_PASSWORD and ADMIN_SESSION_TOKEN
sudo mkdir -p data
sudo npm run build
sudo pm2 start deploy/ovh/ecosystem.config.cjs
sudo pm2 save
sudo pm2 startup
```

## 3. Domain + HTTPS

Point the domain **A record** to the VPS public IP.

```bash
sudo cp deploy/ovh/nginx.conf /etc/nginx/sites-available/forever-events
sudo nano /etc/nginx/sites-available/forever-events   # replace YOUR_DOMAIN
sudo ln -sf /etc/nginx/sites-available/forever-events /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d YOUR_DOMAIN -d www.YOUR_DOMAIN
```

## 4. After each update

```bash
cd /var/www/forever-events
sudo git pull
sudo npm ci
sudo npm run build
sudo pm2 restart forever-events
```

Admin: `https://YOUR_DOMAIN/admin`
