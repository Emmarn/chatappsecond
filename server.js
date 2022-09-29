
const net = require('net');
const socket = require('socket.io');
const io = socket();

let sockets = [];

const server = net.createServer(socket => {

    sockets.push(socket);
    console.log('En användare anslöt sig.');
    
    socket.on('data', data => {
        broadcast(data, socket);
    });

    socket.on('error', err => {
        console.log('En användare förlorade anslutningen.');
    });

    socket.on('close', () => {
        console.log("En användare har lämnat chatten.");
    });

});

server.listen(3000);
io.on("connection", (socket) => {
    socket.join("room");
  });

  io.to("room1").emit("event");


function broadcast(message, socketSent) {
    if (message === 'quit') {
        const index = sockets.indexOf(socketSent);
        sockets.splice(index, 1);
    } else {
        sockets.forEach(socket => {
            if (socket !== socketSent) socket.write(message);
        });
    }
}