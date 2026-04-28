#!/bin/bash

# Lekki Stays Server Restart Script

echo "🔄 Restarting Lekki Stays Server..."
echo ""

# Navigate to server directory
cd server

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ ERROR: .env file not found in server/ directory"
    echo "Please make sure .env file exists with BASE_URL configured"
    exit 1
fi

# Check if BASE_URL is set
if ! grep -q "BASE_URL=" .env; then
    echo "❌ ERROR: BASE_URL not found in .env file"
    echo "Please add: BASE_URL=http://localhost:3000"
    exit 1
fi

echo "✅ .env file found"
echo "✅ BASE_URL configured"
echo ""

# Kill existing Node processes (optional - comment out if you want to stop manually)
echo "🛑 Stopping existing server processes..."
pkill -f "node.*server.js" 2>/dev/null || echo "No existing server process found"
sleep 2

# Start the server
echo ""
echo "🚀 Starting server..."
npm start

# If npm start fails, try node directly
if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️ npm start failed, trying direct node command..."
    node server.js
fi
