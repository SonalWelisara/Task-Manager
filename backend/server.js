const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/dbConfig');
const authRoutes = require('./routes/authRouter');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

app.set('io', io);
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);


io.on('connection', (socket) => {
  console.log('Client connected', socket.id);
});

sequelize.sync().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
