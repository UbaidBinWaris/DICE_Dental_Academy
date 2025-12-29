# DICE Dental Academy - VPS Deployment Guide

## Prerequisites

- Ubuntu 22.04 LTS VPS (Minimum: 2GB RAM, 2 CPU cores, 20GB storage)
- Domain name pointing to your VPS IP address
- SSH access to your VPS

## Table of Contents

1. [Server Initial Setup](#server-initial-setup)
2. [Install Required Software](#install-required-software)
3. [Database Setup](#database-setup)
4. [Deploy Spring Boot Backend](#deploy-spring-boot-backend)
5. [Configure Nginx](#configure-nginx)
6. [SSL Certificate Setup](#ssl-certificate-setup)
7. [Set Up Firewall](#set-up-firewall)
8. [Configure Environment Variables](#configure-environment-variables)
9. [Deploy Updates](#deploy-updates)
10. [Monitoring and Maintenance](#monitoring-and-maintenance)

---

## Server Initial Setup

### 1. Connect to VPS

```bash
ssh root@your_vps_ip
```

### 2. Create Non-Root User

```bash
# Create new user
adduser diceadmin

# Add to sudo group
usermod -aG sudo diceadmin

# Switch to new user
su - diceadmin
```

### 3. Update System

```bash
sudo apt update
sudo apt upgrade -y
```

---

## Install Required Software

### 1. Install Java (OpenJDK 17)

```bash
sudo apt install openjdk-17-jdk -y

# Verify installation
java -version
```

### 2. Install PostgreSQL

```bash
# Install PostgreSQL 15
sudo apt install postgresql postgresql-contrib -y

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify
sudo systemctl status postgresql
```

### 3. Install Nginx

```bash
sudo apt install nginx -y

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4. Install Certbot (for SSL)

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 5. Install Git

```bash
sudo apt install git -y
```

---

## Database Setup

### 1. Configure PostgreSQL

```bash
# Switch to postgres user
sudo -i -u postgres

# Create database user
createuser --interactive --pwprompt dice_admin
# Enter password: DiceAcademy2024!Secure
# Superuser: No
# Create databases: Yes
# Create roles: No

# Create application user
createuser --pwprompt dice_app
# Enter password: DiceApp2024!Connect

# Exit postgres user
exit
```

### 2. Upload Database Scripts

```bash
# On your local machine, upload database scripts
scp -r c:\Users\PMLS\Documents\GitHub\DICE_Dental_Academy\database diceadmin@your_vps_ip:/home/diceadmin/
```

### 3. Run Database Scripts

```bash
# On VPS
cd /home/diceadmin/database

# Run database creation script
sudo -u postgres psql -f 01_create_database.sql

# Run table creation script
sudo -u postgres psql -d dice_dental_academy -f 02_create_tables.sql
```

### 4. Configure PostgreSQL for Remote Access (Optional)

```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/15/main/postgresql.conf

# Find and modify:
listen_addresses = 'localhost'  # Keep as localhost for security

# Edit pg_hba.conf
sudo nano /etc/postgresql/15/main/pg_hba.conf

# Add this line (local connections only):
host    dice_dental_academy    dice_app    127.0.0.1/32    md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

---

## Deploy Spring Boot Backend

### 1. Create Application Directory

```bash
sudo mkdir -p /opt/dice-academy
sudo chown diceadmin:diceadmin /opt/dice-academy
```

### 2. Build Spring Boot Application

On your local machine:

```powershell
# Navigate to backend directory
cd c:\Users\PMLS\Documents\GitHub\DICE_Dental_Academy\dice-dental-backend

# Build JAR file
.\mvnw clean package -DskipTests

# The JAR will be in: target/dice-dental-academy-0.0.1-SNAPSHOT.jar
```

### 3. Upload JAR to VPS

```bash
# From local machine
scp target/dice-dental-academy-0.0.1-SNAPSHOT.jar diceadmin@your_vps_ip:/opt/dice-academy/app.jar
```

### 4. Create Application Configuration

```bash
# On VPS
sudo nano /opt/dice-academy/application-prod.yml
```

Add this content:

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/dice_dental_academy
    username: dice_app
    password: DiceApp2024!Connect
    driver-class-name: org.postgresql.Driver
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true

  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 20MB

jwt:
  secret: your_super_secret_jwt_key_change_this_in_production
  expiration: 86400000  # 24 hours
  refresh-expiration: 604800000  # 7 days

storage:
  type: local
  local:
    upload-dir: /opt/dice-academy/uploads
    base-url: https://api.yourdomain.com/uploads

email:
  host: smtp.gmail.com
  port: 587
  username: ${EMAIL_USERNAME}
  password: ${EMAIL_PASSWORD}
  from: noreply@yourdomain.com

logging:
  level:
    root: INFO
    com.dice.academy: DEBUG
  file:
    name: /opt/dice-academy/logs/application.log
```

### 5. Create Environment Variables File

```bash
sudo nano /opt/dice-academy/.env
```

Add:

```bash
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
JWT_SECRET=your_super_secret_jwt_key_change_this
```

### 6. Create Uploads Directory

```bash
mkdir -p /opt/dice-academy/uploads
mkdir -p /opt/dice-academy/logs
```

### 7. Create Systemd Service

```bash
sudo nano /etc/systemd/system/dice-academy.service
```

Add this content:

```ini
[Unit]
Description=DICE Dental Academy Backend
After=postgresql.service
Requires=postgresql.service

[Service]
Type=simple
User=diceadmin
Group=diceadmin
WorkingDirectory=/opt/dice-academy

# Load environment variables
EnvironmentFile=/opt/dice-academy/.env

# Run the application
ExecStart=/usr/bin/java -jar /opt/dice-academy/app.jar --spring.config.location=/opt/dice-academy/application-prod.yml

# Restart on failure
Restart=on-failure
RestartSec=10

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=dice-academy

[Install]
WantedBy=multi-user.target
```

### 8. Start the Application

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable dice-academy

# Start the service
sudo systemctl start dice-academy

# Check status
sudo systemctl status dice-academy

# View logs
sudo journalctl -u dice-academy -f
```

---

## Configure Nginx

### 1. Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/dice-academy
```

Add this content:

```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    client_max_body_size 20M;

    # Logs
    access_log /var/log/nginx/dice-academy-access.log;
    error_log /var/log/nginx/dice-academy-error.log;

    # API proxy
    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads
    location /uploads {
        alias /opt/dice-academy/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Health check
    location /health {
        proxy_pass http://localhost:8080/health;
    }
}
```

### 2. Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/dice-academy /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## SSL Certificate Setup

### 1. Obtain SSL Certificate

```bash
# Get SSL certificate for API subdomain
sudo certbot --nginx -d api.yourdomain.com

# Follow the prompts
# Choose option 2 to redirect HTTP to HTTPS
```

### 2. Auto-Renewal

```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Certbot will automatically set up a cron job for renewal
```

---

## Set Up Firewall

```bash
# Allow SSH
sudo ufw allow OpenSSH

# Allow HTTP
sudo ufw allow 'Nginx HTTP'

# Allow HTTPS
sudo ufw allow 'Nginx HTTPS'

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Configure Environment Variables

### Update Environment File

```bash
sudo nano /opt/dice-academy/.env
```

Update with production values:

```bash
# Database
DB_PASSWORD=your_production_database_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_at_least_256_bits_long

# Email
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Storage
STORAGE_BASE_URL=https://api.yourdomain.com/uploads

# Third-party APIs (add as needed)
WHATSAPP_API_KEY=your_whatsapp_api_key
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
FACEBOOK_PIXEL_ID=your_pixel_id
```

---

## Deploy Updates

### Create Deployment Script

```bash
nano /home/diceadmin/deploy.sh
```

Add:

```bash
#!/bin/bash

echo "Starting deployment..."

# Stop the application
sudo systemctl stop dice-academy

# Backup current JAR
cp /opt/dice-academy/app.jar /opt/dice-academy/app.jar.backup

# Copy new JAR (uploaded via SCP)
cp /home/diceadmin/app.jar /opt/dice-academy/app.jar

# Start the application
sudo systemctl start dice-academy

# Wait for startup
sleep 10

# Check status
sudo systemctl status dice-academy

echo "Deployment complete!"
```

Make it executable:

```bash
chmod +x /home/diceadmin/deploy.sh
```

### Deploy New Version

```bash
# 1. On local machine, build new JAR
cd c:\Users\PMLS\Documents\GitHub\DICE_Dental_Academy\dice-dental-backend
.\mvnw clean package -DskipTests

# 2. Upload to VPS
scp target/dice-dental-academy-0.0.1-SNAPSHOT.jar diceadmin@your_vps_ip:/home/diceadmin/app.jar

# 3. On VPS, run deployment script
./deploy.sh
```

---

## Monitoring and Maintenance

### 1. View Application Logs

```bash
# Real-time logs
sudo journalctl -u dice-academy -f

# Last 100 lines
sudo journalctl -u dice-academy -n 100

# Logs for today
sudo journalctl -u dice-academy --since today
```

### 2. Check Application Status

```bash
# Service status
sudo systemctl status dice-academy

# Check if running
curl http://localhost:8080/health
```

### 3. Database Backup Script

```bash
nano /home/diceadmin/backup.sh
```

Add:

```bash
#!/bin/bash

BACKUP_DIR="/home/diceadmin/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
sudo -u postgres pg_dump dice_dental_academy | gzip > $BACKUP_DIR/dice_db_$DATE.sql.gz

# Delete backups older than 30 days
find $BACKUP_DIR -name "dice_db_*.sql.gz" -mtime +30 -delete

echo "Backup completed: dice_db_$DATE.sql.gz"
```

Make executable:

```bash
chmod +x /home/diceadmin/backup.sh
```

### 4. Set Up Cron Job for Backups

```bash
crontab -e
```

Add:

```bash
# Daily backup at 2 AM
0 2 * * * /home/diceadmin/backup.sh >> /home/diceadmin/backup.log 2>&1
```

### 5. Monitor Disk Space

```bash
# Check disk usage
df -h

# Check largest directories
du -h --max-depth=1 /opt/dice-academy | sort -hr
```

### 6. Restart Application

```bash
# Restart
sudo systemctl restart dice-academy

# Stop
sudo systemctl stop dice-academy

# Start
sudo systemctl start dice-academy
```

---

## Security Best Practices

1. **Change Default Passwords**
   - Database passwords
   - JWT secret
   - Admin user passwords

2. **Enable Fail2Ban**
   ```bash
   sudo apt install fail2ban -y
   sudo systemctl enable fail2ban
   ```

3. **Regular Updates**
   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

4. **Monitor Logs**
   - Check application logs daily
   - Monitor Nginx access and error logs
   - Review database logs

5. **Backup Strategy**
   - Daily database backups
   - Keep backups for 30 days
   - Test restore process monthly

---

## Troubleshooting

### Application Won't Start

```bash
# Check logs
sudo journalctl -u dice-academy -n 50

# Check if port is in use
sudo netstat -tulpn | grep 8080

# Verify Java installation
java -version
```

### Database Connection Issues

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test database connection
sudo -u postgres psql -d dice_dental_academy -c "SELECT 1;"

# Check pg_hba.conf
sudo nano /etc/postgresql/15/main/pg_hba.conf
```

### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/dice-academy-error.log

# Restart Nginx
sudo systemctl restart nginx
```

---

## Cost Estimate

### VPS Recommendations:

1. **DigitalOcean** - $12/month (2GB RAM, 1 CPU, 50GB SSD)
2. **Linode** - $12/month (2GB RAM, 1 CPU, 50GB storage)
3. **Vultr** - $12/month (2GB RAM, 1 CPU, 55GB SSD)

### Additional Costs:

- Domain name: $10-15/year
- Email service (SendGrid): Free tier (100 emails/day)
- Backups: $1-2/month

**Total Monthly Cost: ~$12-15/month**

---

## Next Steps After Deployment

1. ✅ Backend deployed on VPS
2. Deploy Next.js frontend to Vercel
3. Deploy Next.js admin to Vercel
4. Configure CORS to allow frontend domains
5. Test all API endpoints
6. Set up monitoring (optional: UptimeRobot)
7. Configure backup automation
