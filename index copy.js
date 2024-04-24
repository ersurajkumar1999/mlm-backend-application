const express = require("express");
const http = require("http");
const cors = require('cors');
const dotenv = require("dotenv");
const { PORT } = require('./utilities/config');
const connectToDB = require("./db");
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const countryRoutes = require('./routes/countryRoutes');
const stateRoutes = require('./routes/stateRoutes');
const cityRoutes = require('./routes/cityRoutes');
const friendShipRoutes = require('./routes/friendShipRoutes');
const imageRoutes = require('./routes/imageRoutes');
const postRoutes = require('./routes/postRoutes');
const chatRoutes = require('./routes/chatRoutes');
const connectionRoutes = require('./routes/connectionRoutes');

const { Server } = require("socket.io");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

app.use(cors());


app.use('/', homeRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', adminRoutes);
app.use('/api/v1', countryRoutes);
app.use('/api/v1', stateRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', cityRoutes);
app.use('/api/v1', friendShipRoutes);
app.use('/api/v1', imageRoutes);
app.use('/api/v1', postRoutes);
app.use('/api/v1', chatRoutes);
app.use('/api/v1', connectionRoutes);

connectToDB();
const server = http.createServer(app);


const io = new Server(server, {
   cors: {
      origin: "*",
   }
});
// io.on('connection', (socket) => {
//    console.log('socket connected', socket.id);
// });

io.on('connection', (socket) => {
   socket.on('setup', (userData) => {
      socket.join(userData._id);
      socket.emit('connected');
   });
   socket.on('join room', (room) => {
      socket.join(room);
   });
   socket.on('typing', (room) => {
      // socket.in(room).emit('typing');
      io.emit('typing');
   });
   socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

   socket.on('new message', (newMessageRecieve) => {
      var chat = newMessageRecieve.chatId;
      if (!chat.users) console.log('chats.users is not defined');
      chat.users.forEach((user) => {
         if (user._id == newMessageRecieve.sender._id) return;
         io.emit('message recieved', newMessageRecieve);
         // socket.in(user._id).emit('message recieved', newMessageRecieve);
      });
   });
});
server.listen(PORT, () => {
   console.log(`server up on port ${PORT}`);
});