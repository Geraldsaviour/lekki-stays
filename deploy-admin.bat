@echo off
REM ============================================
REM Deploy Admin Dashboard to Vercel (Windows)
REM ============================================

echo.
echo 🔐 Deploying Lekki Stays Admin Dashboard...
echo.

REM Check if vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel CLI not found!
    echo 📦 Install it with: npm install -g vercel
    exit /b 1
)

REM Check if vercel-admin.json exists
if not exist "vercel-admin.json" (
    echo ❌ vercel-admin.json not found!
    exit /b 1
)

REM Copy vercel-admin.json to vercel.json temporarily
echo 📋 Using admin configuration...
copy vercel-admin.json vercel.json >nul

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
call vercel --prod

REM Clean up
del vercel.json

echo.
echo ✅ Admin Dashboard deployed successfully!
echo 🌐 Check your deployment at: https://vercel.com/dashboard
echo.
pause
