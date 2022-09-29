
const net = require('net');
const socket = require('socket.io');
const io = socket();

let sockets = [];

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
       //användaren väljer vilken port servern ska ansluta till
let choosenPort = new Promise(resolve => {
    readLine.question('Ange vilken port du vill starta din server på: ', port => {
        resolve(port)
    })
})
        
    choosenPort.then((port) => {
        const server = net.createServer(socket => {
            sockets.push(socket);
    console.log('En användare anslöt sig.');
    
    socket.on('data', data => {
        broadcast(data, socket);
        })
    
    
    socket.on('error', err => {
        console.log('En användare förlorade anslutningen.');
    });

    socket.on('close', () => {
        console.log("En användare har lämnat chatten.");
    });

});
    
server.listen(port, 3000, () => {
    console.log('Servern öppnades på port: ' + port)  // felmeddelanden om man försöker öppna på annat än 3000?
});

function broadcast(message, socketSent) {
    if (message === 'quit') {
        const index = sockets.indexOf(socketSent);
        sockets.splice(index, 1);
    } else {
        sockets.forEach(socket => {
            if (socket !== socketSent) socket.write(message);
        });
    }
}})