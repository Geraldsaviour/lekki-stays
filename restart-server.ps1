# Lekki Stays Server Restart Script (PowerShell)

Write-Host "🔄 Restarting Lekki Stays Server..." -ForegroundColor Cyan
Write-Host ""

# Navigate to server directory
Set-Location server

# Check if .env file exists
if (-not (Test-Path .env)) {
    Write-Host "❌ ERROR: .env file not found in server/ directory" -ForegroundColor Red
    Write-Host "Please make sure .env file exists with BASE_URL configured" -ForegroundColor Yellow
    exit 1
}

# Check if BASE_URL is set
$envContent = Get-Content .env -Raw
if ($envContent -notmatch "BASE_URL=") {
    Write-Host "❌ ERROR: BASE_URL not found in .env file" -ForegroundColor Red
    Write-Host "Please add: BASE_URL=http://localhost:3000" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ .env file found" -ForegroundColor Green
Write-Host "✅ BASE_URL configured" -ForegroundColor Green
Write-Host ""

# Kill existing Node processes
Write-Host "🛑 Stopping existing server processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {$_.Path -like "*server*"} | Stop-Process -Force
Start-Sleep -Seconds 2

# Start the server
Write-Host ""
Write-Host "🚀 Starting server..." -ForegroundColor Cyan
npm start

# If npm start fails, try node directly
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️ npm start failed, trying direct node command..." -ForegroundColor Yellow
    node server.js
}
