var express = require('express');

module.exports = function (io) {
    io.on('connection', (socket) => {

        socket.on("joinRoom", (gameRoom) => {

            // socket.join(gameRoom.room);
            var room = io.sockets.adapter.rooms[gameRoom.room];
            if (room) {
                if (room.length < 2) {
                    socket.join(gameRoom.room);
                    io.in(gameRoom.room).emit('friendJoined', { friendJoined: true });
                } else {
                    socket.emit('roomFull', { roomFull: true });
                }
            } else {
                socket.join(gameRoom.room);
                io.in(gameRoom.room).emit('userJoined', { userJoined: true });
            }
        });

        socket.on('gameArray', (gameArr) => {
            socket.to(gameArr.room).emit('gameArr', {
                gameArray: gameArr.gameArray
            });
        });

        socket.on('textMsg', (msg) => {
            socket.to(msg.room).emit('message', {
                message: msg.message
            });
        });

        socket.on('leavingRoom', (room) => {
            io.in(room.room).emit('friendLeft', { friendLeft: true });
        });
    });
}