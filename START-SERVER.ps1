Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host " Starting Local Web Server" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Server URL: http://localhost:8000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Try 'py' command first (Windows Python Launcher), then 'python'
$pythonCmd = $null
if (Get-Command py -ErrorAction SilentlyContinue) {
    $pythonCmd = "py"
    Write-Host "Found Python via 'py' launcher..." -ForegroundColor Green
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonCmd = "python"
    Write-Host "Found Python via 'python' command..." -ForegroundColor Green
} else {
    Write-Host "ERROR: Python not found!" -ForegroundColor Red
    Write-Host "Please install Python from: https://www.python.org/downloads/" -ForegroundColor Yellow
    pause
    exit 1
}

# Start the server
Write-Host "Starting Python HTTP server..." -ForegroundColor White
& $pythonCmd -m http.server 8000
