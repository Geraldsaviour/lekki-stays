#!/bin/bash

# Setup script for creating separate admin repository
# Run this from the admin folder

echo "🚀 Setting up Lekki Stays Admin Repository"
echo ""

# Check if we're in the admin folder
if [ ! -f "firebase-config.js" ]; then
    echo "❌ Error: Please run this script from the admin folder"
    exit 1
fi

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Error: GitHub username is required"
    exit 1
fi

echo ""
echo "📝 Repository will be created at:"
echo "   https://github.com/$GITHUB_USERNAME/lekki-stays-admin"
echo ""

# Confirm
read -p "Continue? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ Cancelled"
    exit 0
fi

echo ""
echo "🔧 Initializing git repository..."

# Initialize git if not already
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git initialized"
else
    echo "ℹ️  Git already initialized"
fi

# Add all files
echo ""
echo "📦 Adding files..."
git add .

# Create initial commit
echo ""
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Lekki Stays Admin Dashboard

- Firebase Authentication integration
- Dashboard UI with booking management
- Direct Firestore connection
- No backend server required"

# Add remote
echo ""
echo "🔗 Adding GitHub remote..."
git remote add origin "https://github.com/$GITHUB_USERNAME/lekki-stays-admin.git" 2>/dev/null || \
git remote set-url origin "https://github.com/$GITHUB_USERNAME/lekki-stays-admin.git"

# Set main branch
echo ""
echo "🌿 Setting main branch..."
git branch -M main

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Create the repository on GitHub:"
echo "   https://github.com/new"
echo "   - Name: lekki-stays-admin"
echo "   - Visibility: Private (recommended)"
echo "   - DO NOT initialize with README"
echo ""
echo "2. Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "3. Enable Firebase Authentication:"
echo "   See FIREBASE_ADMIN_SETUP.md for instructions"
echo ""
echo "4. Deploy to Firebase Hosting:"
echo "   npm run deploy"
echo ""
echo "🎉 Your admin dashboard is ready to go!"
