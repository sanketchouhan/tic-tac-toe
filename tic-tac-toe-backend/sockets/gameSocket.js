var express = require('express');

module.exports = function (io) {
    io.on('connection', (socket) => {

        socket.on("joinRoom", (gameRoom) => {
            socket.join(gameRoom.room);
            var room = io.sockets.adapter.rooms[gameRoom.room];
            if (room.length == 1) {
                io.in(gameRoom.room).emit('userJoined', { userJoined : true});
            } else {
                io.in(gameRoom.room).emit('friendJoined', { friendJoined : true});
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
            io.in(room.room).emit('friendLeft', { friendLeft : true});
        });
    });
}