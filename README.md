Realtime Chat (React + Socket.IO)
=================================

This project contains:
- server/ : Node.js + Express + Socket.IO backend
- client/ : Vite + React frontend

Quick start (Windows 11, VS Code)
1. Open two terminal windows (or two VS Code terminals).
2. Server:
   cd server
   npm install
   npm start
3. Client:
   cd client
   npm install
   npm run dev
4. Open browser at the Vite dev URL (usually http://localhost:5173)
5. Join a room from two different browser tabs to test realtime chat.

Notes:
- Messages are stored in-memory on the server (for demo only).
- For production, use a database and proper CORS/HTTPS configuration.
