@echo off
title Cloudflare Tunnel for Fursynth
echo ========================================================
echo       CLOUDFLARE TUNNEL FOR FURSYNTH LOCAL BACKEND
echo ========================================================
echo.
echo This script connects your local Python server (http://localhost:8000)
echo securely to Cloudflare with free HTTPS, no port forwarding needed!
echo.

where cloudflared >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] cloudflared is not installed yet on your system.
    echo.
    echo To install cloudflared on Windows, you can:
    echo   1. Run with scoop: 'scoop install cloudflared'
    echo   2. Run with winget: 'winget install Cloudflare.cloudflared'
    echo   3. Or download from: https://github.com/cloudflare/cloudflared/releases
    echo.
    pause
    exit /b
)

echo Starting quick tunnel to localhost:8000 ...
cloudflared tunnel --url http://localhost:8000

pause
