#!/bin/bash

# ============================================
# Deploy User Frontend to Vercel
# ============================================

echo "🚀 Deploying Lekki Stays User Frontend..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found!"
    echo "📦 Install it with: npm install -g vercel"
    exit 1
fi

# Check if vercel-user.json exists
if [ ! -f "vercel-user.json" ]; then
    echo "❌ vercel-user.json not found!"
    exit 1
fi

# Copy vercel-user.json to vercel.json temporarily
echo "📋 Using user configuration..."
cp vercel-user.json vercel.json

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

# Clean up
rm vercel.json

echo ""
echo "✅ User Frontend deployed successfully!"
echo "🌐 Check your deployment at: https://vercel.com/dashboard"
