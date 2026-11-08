@echo off
title Fursynth Studio Launcher
echo ========================================================
echo         FURSYNTH COSMIC VRChat STUDIO LAUNCHER
echo ========================================================
echo.
echo Launching Python Backend and Frontend Development Server...
echo.

cd /d "%~dp0"

:: Start Python Backend in a separate window
start "Fursynth Backend (Python:8000)" cmd /k "cd backend && run_backend.bat"

:: Start Frontend Vite in a separate window
start "Fursynth Frontend (Vite:5173)" cmd /k "cd frontend && npm run dev"

echo Both servers are starting up!
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul

start http://localhost:5173
echo.
echo Press any key to close this launcher window.
pause >nul

