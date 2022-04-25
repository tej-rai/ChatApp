const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const app = express();

app.get('/', (req,res) => {
    res.sendFile('chat.html', { root: __dirname });
    // res.send('Hello from Express App!!');
})


const httpServer = http.createServer(app).listen(3000);

//taking the webserver and enhancing it with socketio functionality
const io = socketIO(httpServer);

// server-side
//event!!
io.on('connection', (socket) => {
    console.log('Client connected');
    //send back a message to newly connected client
    socket.emit('welcome', 'Welcome from the Chat server!!');
    setInterval(() => socket.emit('time', new Date().toTimeString()),1000);

    // capture when the client disconnets
    socket.on('disconnect', () => {
        console.log('client disconnected');
    });

    // capture when a message arrives from the client
    socket.on('message', (message) => {
        console.log(message);
        // send the message to ALL clients
        io.emit('message', message);
    });

});

 