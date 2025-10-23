@echo off
title Realtime Chat - CODTECH Task
echo Starting server and client...

REM Open server terminal
start cmd /k "cd server && npm install && npm start"

REM Open client terminal
start cmd /k "cd client && npm install && npm run dev"

echo All started. Open http://localhost:5173 in your browser.
pause
