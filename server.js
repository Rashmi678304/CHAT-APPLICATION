const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const rooms = {};

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('join_room', ({ roomId, username }) => {
    socket.join(roomId);
    socket.data.username = username;
    socket.data.roomId = roomId;

    const history = rooms[roomId] || [];
    socket.emit('chat_history', history);

    socket.to(roomId).emit('user_joined', { username });
  });

  socket.on('send_message', (payload) => {
    const roomId = payload.roomId || socket.data.roomId;
    if (!roomId) return;
    const msg = {
      id: Date.now() + Math.random().toString(36).slice(2,7),
      username: payload.username || socket.data.username || 'Unknown',
      text: payload.text,
      time: new Date().toISOString()
    };
    rooms[roomId] = rooms[roomId] || [];
    rooms[roomId].push(msg);
    io.in(roomId).emit('receive_message', msg);
  });

  socket.on('typing', ({ roomId, username, isTyping }) => {
    const targetRoom = roomId || socket.data.roomId;
    if (!targetRoom) return;
    socket.to(targetRoom).emit('user_typing', { username, isTyping });
  });

  socket.on('disconnect', () => {
    const username = socket.data.username;
    const roomId = socket.data.roomId;
    if (roomId && username) {
      socket.to(roomId).emit('user_left', { username });
    }
    console.log('Socket disconnected', socket.id);
  });
});

app.get('/health', (req, res) => res.send({ ok: true }));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));