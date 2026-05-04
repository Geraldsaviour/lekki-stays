#!/bin/bash

# ============================================
# Deploy Admin Dashboard to Vercel
# ============================================

echo "🔐 Deploying Lekki Stays Admin Dashboard..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found!"
    echo "📦 Install it with: npm install -g vercel"
    exit 1
fi

# Check if vercel-admin.json exists
if [ ! -f "vercel-admin.json" ]; then
    echo "❌ vercel-admin.json not found!"
    exit 1
fi

# Copy vercel-admin.json to vercel.json temporarily
echo "📋 Using admin configuration..."
cp vercel-admin.json vercel.json

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

# Clean up
rm vercel.json

echo ""
echo "✅ Admin Dashboard deployed successfully!"
echo "🌐 Check your deployment at: https://vercel.com/dashboard"
