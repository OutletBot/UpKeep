@echo off
echo.
echo ====================================
echo  Starting Local Web Server
echo ====================================
echo.
echo Checking for Python...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH!
    echo.
    echo Please install Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation!
    echo.
    pause
    exit /b 1
)

echo Python found! Starting server...
echo.
echo Server will start on: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul
start http://localhost:8000
echo.

REM Start Python HTTP server (works with Python 3)
python -m http.server 8000

REM Keep window open if there's an error
if errorlevel 1 (
    echo.
    echo ERROR: Failed to start server!
    echo.
    pause
)
