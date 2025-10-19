Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host " Starting Local Web Server" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Server URL: http://localhost:8000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Try Python 3 first
try {
    Write-Host "Starting Python HTTP server..." -ForegroundColor White
    python -m http.server 8000
} catch {
    # Fallback to Python 2
    Write-Host "Trying Python 2..." -ForegroundColor Yellow
    python -m SimpleHTTPServer 8000
}
