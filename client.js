const net = require('net');

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
//väntar på att användaren skrivit in användarnamn innan den körs vidare
const waitForUsername = new Promise(resolve => {
    readLine.question('Välj ett användarnamn: ', answer => {
        resolve(answer);
    });
});

waitForUsername.then((username) => {

    const socket = net.connect({
        port: 3000
    });

    readLine.on('line', data => {
        if (data === 'quit') {
            socket.write(`${username} har lämnat chatten.`);
            socket.setTimeout(1000);
        } else {
            socket.write(username + ': ' + data);
        }
    });

    socket.on('connect', () => {
        socket.write(username + ' har anslutit till chatten.');
    });

    socket.on('data', data => {
        console.log('\x1b[33m%s\x1b[0m', data);
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


