const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;

app.use(express.static('public'));

let users = {}; // nomor_telepon: socket.id

io.on('connection', socket => {
  console.log('Pengguna tersambung');

  socket.on('register', phone => {
    users[phone] = socket.id;
    socket.phone = phone;
    console.log(`Terdaftar: ${phone}`);
  });

  socket.on('send_message', data => {
    const { from, to, message } = data;
    if (users[to]) {
      io.to(users[to]).emit('receive_message', { from, message });
    }
    io.to(users[from]).emit('receive_message', { from, message });
  });

  socket.on('disconnect', () => {
    if (socket.phone) delete users[socket.phone];
    console.log('Pengguna terputus');
  });
});

http.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
