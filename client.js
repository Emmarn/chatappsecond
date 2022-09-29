const net = require('net');
const readline = require('readline');

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const waitForUsername = new Promise(resolve => {
    readLine.question('Välj ett användarnamn: ', answer => {
        resolve(answer);
    });
});
  // tar in användarens namn och ansluter till servern
waitForUsername.then((username) => {

    const socket = net.connect({
        port: 3000
    });

    readLine.on('line', data => {
        if (data === 'quit') {
            socket.write(`${username} har lämnat chatten.`);
            socket.setTimeout(1000); // användaren sätts på timeout efter 1000 millisekunder
        } else {
            socket.write(username + ': ' + data);
        }
    });

    socket.on('connect', () => {
        socket.write(username + ' har anslutit till chatten.');
    });

    socket.on('data', data => {
       console.log('\x1b[36m%s\x1b[0m', data); // första delen bestämmer textens färg, i det här fallet blå. data är texten som användaren skrev in.
        
    });

    socket.on('timeout', () => {
        socket.write('quit');
        socket.end();
    });

    socket.on('end', () => {
        process.exit();
    });

    socket.on('error', () => {
        console.log('Servern har stängts av...');
    });
});


