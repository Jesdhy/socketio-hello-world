var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

// serve html file
app.get('/', function(req, res){
    var options ={
        root: path.join(__dirname)
    }
    var filename = 'index.html';
    res.sendFile(filename,options);
}); 
// SERVER
io.on('connection',function(socket){
    console.log('A user connected');

    // send the message client
    socket.emit('welcome', '¡since the server!');

    // listen message client
    socket.on('clientMessage', function(msg){
        console.log('Customer Message:', msg);
    });

    socket.on('disconnect', function(){
        console.log('A user disconnected'); 

    });
});

//puerto que esta a la escucha 
http.listen(3000, function(){
    console.log('server ready on 3000'); 
})
