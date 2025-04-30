const socket = io();
const phone = localStorage.getItem('phone');
document.getElementById('myNumber').textContent = phone;

socket.emit('register', phone);

function sendMessage() {
  const to = document.getElementById('to').value;
  const msg = document.getElementById('message').value;
  socket.emit('send_message', {
    from: phone,
    to,
    message: msg
  });
  document.getElementById('message').value = '';
}

socket.on('receive_message', data => {
  const box = document.getElementById('messages');
  const el = document.createElement('div');
  el.innerHTML = `<b>${data.from}:</b> ${data.message}`;
  box.appendChild(el);
  box.scrollTop = box.scrollHeight;
});
