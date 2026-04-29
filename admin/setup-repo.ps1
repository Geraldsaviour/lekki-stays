# Setup script for creating separate admin repository
# Run this from the admin folder in PowerShell

Write-Host "🚀 Setting up Lekki Stays Admin Repository" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the admin folder
if (-not (Test-Path "firebase-config.js")) {
    Write-Host "❌ Error: Please run this script from the admin folder" -ForegroundColor Red
    exit 1
}

# Get GitHub username
$GITHUB_USERNAME = Read-Host "Enter your GitHub username"

if ([string]::IsNullOrWhiteSpace($GITHUB_USERNAME)) {
    Write-Host "❌ Error: GitHub username is required" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📝 Repository will be created at:" -ForegroundColor Yellow
Write-Host "   https://github.com/$GITHUB_USERNAME/lekki-stays-admin"
Write-Host ""

# Confirm
$CONFIRM = Read-Host "Continue? (y/n)"

if ($CONFIRM -ne "y" -and $CONFIRM -ne "Y") {
    Write-Host "❌ Cancelled" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "🔧 Initializing git repository..." -ForegroundColor Cyan

# Initialize git if not already
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Git already initialized" -ForegroundColor Yellow
}

# Add all files
Write-Host ""
Write-Host "📦 Adding files..." -ForegroundColor Cyan
git add .

# Create initial commit
Write-Host ""
Write-Host "💾 Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Lekki Stays Admin Dashboard

- Firebase Authentication integration
- Dashboard UI with booking management
- Direct Firestore connection
- No backend server required"

# Add remote
Write-Host ""
Write-Host "🔗 Adding GitHub remote..." -ForegroundColor Cyan
$remoteUrl = "https://github.com/$GITHUB_USERNAME/lekki-stays-admin.git"

try {
    git remote add origin $remoteUrl 2>$null
} catch {
    git remote set-url origin $remoteUrl
}

# Set main branch
Write-Host ""
Write-Host "🌿 Setting main branch..." -ForegroundColor Cyan
git branch -M main

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Create the repository on GitHub:"
Write-Host "   https://github.com/new"
Write-Host "   - Name: lekki-stays-admin"
Write-Host "   - Visibility: Private (recommended)"
Write-Host "   - DO NOT initialize with README"
Write-Host ""
Write-Host "2. Push to GitHub:"
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Enable Firebase Authentication:"
Write-Host "   See FIREBASE_ADMIN_SETUP.md for instructions"
Write-Host ""
Write-Host "4. Deploy to Firebase Hosting:"
Write-Host "   npm run deploy" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 Your admin dashboard is ready to go!" -ForegroundColor Green
