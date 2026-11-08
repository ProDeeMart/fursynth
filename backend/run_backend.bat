@echo off
title Fursynth Local Backend Server (FastAPI)
echo ========================================================
echo        FURSYNTH COSMIC VRChat STUDIO BACKEND
echo ========================================================
echo.
echo Starting local Python backend on http://localhost:8000 ...
echo API Documentation (Swagger): http://localhost:8000/docs
echo.

cd /d "%~dp0"

if not exist "venv\Scripts\python.exe" (
    echo [!] Virtual environment not found. Creating venv...
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate.bat
)

python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

pause
