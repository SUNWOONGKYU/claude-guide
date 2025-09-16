@echo off
echo Starting local server for Claude Installation Guide...
echo.
echo After server starts, open browser and go to:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
cd /d "G:\내 드라이브\Claude&Claude Code\install"
python -m http.server 8000