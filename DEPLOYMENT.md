# Lekki Stays Booking Platform - Deployment Guide

## Pre-Deployment Checklist

### ✅ Development Complete
- [x] All spec tasks completed
- [x] Backend infrastructure implemented
- [x] Frontend integration complete
- [x] WhatsApp notification system functional
- [x] Security measures implemented
- [x] Performance optimizations applied

### ✅ Testing Complete
- [x] Unit tests passing
- [x] Integration tests passing
- [x] Performance tests passing
- [x] Load tests passing
- [x] Security tests passing
- [x] End-to-end workflow tests passing

### ✅ Documentation Complete
- [x] API documentation
- [x] Performance testing guide
- [x] Monitoring setup guide
- [x] Deployment instructions
- [x] User guides

## System Requirements

### Server Requirements
- **OS**: Ubuntu 20.04+ or Windows Server 2019+
- **Node.js**: v18.0.0 or higher
- **Memory**: 2GB RAM minimum, 4GB recommended
- **Storage**: 10GB minimum, SSD recommended
- **Network**: Stable internet connection for WhatsApp integration

### Environment Variables
Create a `.env` file with the following variables:

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# WhatsApp Configuration
HOST_WHATSAPP_NUMBER=+2349039269846

# Database Configuration
DB_PATH=./data/lekki-stays.db

# Security Configuration
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Monitoring Configuration
ENABLE_PERFORMANCE_MONITORING=true
LOG_LEVEL=info
```

## Deployment Steps

### 1. Server Setup
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Create application directory
sudo mkdir -p /var/www/lekki-stays
sudo chown $USER:$USER /var/www/lekki-stays
```

### 2. Application Deployment
```bash
# Clone or copy application files
cd /var/www/lekki-stays

# Install dependencies
cd server
npm install --production

# Create data directory
mkdir -p ../data

# Set up environment variables
cp .env.example .env
# Edit .env with production values

# Initialize database
npm run init-db

# Run final tests
npm run test:final
```

### 3. Process Management
```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'lekki-stays',
    script: './server/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
};
EOF

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Reverse Proxy Setup (Nginx)
```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo cat > /etc/nginx/sites-available/lekki-stays << EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
    }
    
    # Static files
    location /static/ {
        alias /var/www/lekki-stays/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/lekki-stays /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 6. Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

## Monitoring Setup

### 1. Application Monitoring
```bash
# Set up log rotation
sudo cat > /etc/logrotate.d/lekki-stays << EOF
/var/www/lekki-stays/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

# Create monitoring script
cat > /var/www/lekki-stays/monitor.sh << 'EOF'
#!/bin/bash
cd /var/www/lekki-stays
npm run health > /tmp/health-check.log 2>&1
if [ $? -ne 0 ]; then
    echo "Health check failed at $(date)" >> /var/log/lekki-stays-alerts.log
    # Add notification logic here (email, SMS, etc.)
fi
EOF

chmod +x /var/www/lekki-stays/monitor.sh

# Add to crontab for regular health checks
(crontab -l 2>/dev/null; echo "*/5 * * * * /var/www/lekki-stays/monitor.sh") | crontab -
```

### 2. System Monitoring
```bash
# Install system monitoring tools
sudo apt install htop iotop nethogs -y

# Set up basic system alerts
cat > /var/www/lekki-stays/system-monitor.sh << 'EOF'
#!/bin/bash
# Check disk space
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "High disk usage: ${DISK_USAGE}% at $(date)" >> /var/log/system-alerts.log
fi

# Check memory usage
MEM_USAGE=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
if [ $MEM_USAGE -gt 85 ]; then
    echo "High memory usage: ${MEM_USAGE}% at $(date)" >> /var/log/system-alerts.log
fi
EOF

chmod +x /var/www/lekki-stays/system-monitor.sh
(crontab -l 2>/dev/null; echo "*/10 * * * * /var/www/lekki-stays/system-monitor.sh") | crontab -
```

## Backup Strategy

### 1. Database Backup
```bash
# Create backup script
cat > /var/www/lekki-stays/backup-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/lekki-stays"
DATE=$(date +%Y%m%d_%H%M%S)
DB_FILE="/var/www/lekki-stays/data/lekki-stays.db"

mkdir -p $BACKUP_DIR

# Create database backup
cp $DB_FILE "$BACKUP_DIR/lekki-stays-$DATE.db"

# Compress backup
gzip "$BACKUP_DIR/lekki-stays-$DATE.db"

# Keep only last 30 days of backups
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "Database backup completed: lekki-stays-$DATE.db.gz"
EOF

chmod +x /var/www/lekki-stays/backup-db.sh

# Schedule daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /var/www/lekki-stays/backup-db.sh") | crontab -
```

### 2. Application Backup
```bash
# Create application backup script
cat > /var/www/lekki-stays/backup-app.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/lekki-stays"
DATE=$(date +%Y%m%d_%H%M%S)
APP_DIR="/var/www/lekki-stays"

mkdir -p $BACKUP_DIR

# Create application backup (excluding node_modules and logs)
tar -czf "$BACKUP_DIR/app-$DATE.tar.gz" \
    --exclude="node_modules" \
    --exclude="logs" \
    --exclude="*.log" \
    -C /var/www lekki-stays

# Keep only last 7 days of app backups
find $BACKUP_DIR -name "app-*.tar.gz" -mtime +7 -delete

echo "Application backup completed: app-$DATE.tar.gz"
EOF

chmod +x /var/www/lekki-stays/backup-app.sh

# Schedule weekly backups
(crontab -l 2>/dev/null; echo "0 3 * * 0 /var/www/lekki-stays/backup-app.sh") | crontab -
```

## Security Hardening

### 1. System Security
```bash
# Update system packages regularly
sudo apt update && sudo apt upgrade -y

# Install fail2ban for intrusion prevention
sudo apt install fail2ban -y

# Configure fail2ban for Nginx
sudo cat > /etc/fail2ban/jail.local << EOF
[nginx-http-auth]
enabled = true

[nginx-noscript]
enabled = true

[nginx-badbots]
enabled = true

[nginx-noproxy]
enabled = true
EOF

sudo systemctl restart fail2ban
```

### 2. Application Security
```bash
# Set proper file permissions
sudo chown -R $USER:$USER /var/www/lekki-stays
sudo chmod -R 755 /var/www/lekki-stays
sudo chmod 600 /var/www/lekki-stays/server/.env

# Secure database file
sudo chmod 600 /var/www/lekki-stays/data/lekki-stays.db
```

## Post-Deployment Verification

### 1. Functional Tests
```bash
cd /var/www/lekki-stays
npm run test:final
```

### 2. Performance Tests
```bash
npm run test:performance
npm run test:load:light
```

### 3. Security Tests
```bash
# Test rate limiting
npm run test:load:heavy

# Verify SSL certificate
curl -I https://your-domain.com

# Check security headers
curl -I https://your-domain.com | grep -E "(X-Frame-Options|X-Content-Type-Options|X-XSS-Protection)"
```

### 4. Monitoring Verification
```bash
# Check application health
npm run health

# Verify PM2 status
pm2 status

# Check Nginx status
sudo systemctl status nginx

# Verify SSL auto-renewal
sudo certbot certificates
```

## Maintenance Tasks

### Daily
- [ ] Check application health
- [ ] Review error logs
- [ ] Monitor system resources

### Weekly
- [ ] Review performance metrics
- [ ] Check backup integrity
- [ ] Update dependencies (if needed)

### Monthly
- [ ] Security updates
- [ ] Performance optimization review
- [ ] Backup strategy review
- [ ] Capacity planning review

## Troubleshooting

### Common Issues

#### Application Won't Start
```bash
# Check PM2 logs
pm2 logs lekki-stays

# Check system resources
htop
df -h

# Restart application
pm2 restart lekki-stays
```

#### High Response Times
```bash
# Check performance metrics
curl http://localhost:3000/api/metrics

# Monitor system resources
htop
iotop

# Check database performance
npm run health
```

#### SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Test Nginx configuration
sudo nginx -t
```

## Support Contacts

- **Technical Support**: tech@lekkistays.com
- **Emergency Contact**: +234XXXXXXXXXX
- **Documentation**: https://docs.lekkistays.com

## Rollback Procedure

In case of deployment issues:

1. **Stop current application**:
   ```bash
   pm2 stop lekki-stays
   ```

2. **Restore from backup**:
   ```bash
   cd /var/www
   tar -xzf /var/backups/lekki-stays/app-YYYYMMDD_HHMMSS.tar.gz
   ```

3. **Restore database**:
   ```bash
   gunzip /var/backups/lekki-stays/lekki-stays-YYYYMMDD_HHMMSS.db.gz
   cp /var/backups/lekki-stays/lekki-stays-YYYYMMDD_HHMMSS.db /var/www/lekki-stays/data/lekki-stays.db
   ```

4. **Restart application**:
   ```bash
   pm2 start lekki-stays
   ```

5. **Verify functionality**:
   ```bash
   npm run health
   ```