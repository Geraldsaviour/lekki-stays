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