@echo off
REM ============================================
REM Deploy User Frontend to Vercel (Windows)
REM ============================================

echo.
echo 🚀 Deploying Lekki Stays User Frontend...
echo.

REM Check if vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel CLI not found!
    echo 📦 Install it with: npm install -g vercel
    exit /b 1
)

REM Check if vercel-user.json exists
if not exist "vercel-user.json" (
    echo ❌ vercel-user.json not found!
    exit /b 1
)

REM Copy vercel-user.json to vercel.json temporarily
echo 📋 Using user configuration...
copy vercel-user.json vercel.json >nul

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
call vercel --prod

REM Clean up
del vercel.json

echo.
echo ✅ User Frontend deployed successfully!
echo 🌐 Check your deployment at: https://vercel.com/dashboard
echo.
pause
