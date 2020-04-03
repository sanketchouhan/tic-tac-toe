var express = require('express');
var path = require('path');
const http = require('http');
const socketIO = require('socket.io');

var app = express();


var server = http.createServer(app);
const io = socketIO(server);

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

server.listen(port, function () {
    console.log("server listening on port " + port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './public/tic-tac-toe/')));

var chatSocket = require('./sockets/gameSocket')(io);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/tic-tac-toe/","index.html"));
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({'error':"ERROR"});
});

// module.exports = app;
