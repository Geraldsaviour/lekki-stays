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