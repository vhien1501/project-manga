var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.use(express.static(__dirname+'/'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/',function(req,res){
	res.render('login');
});

app.get('/features',function(req,res){
	res.render('features')
});

http.listen(3000,function(){
	var host=http.address().address;
	var port=http.address().port;
	console.log("Listening at %s:%s",host,port);
});


io.on('connection',function(socket){
	console.log('a user connected');
	socket.on('username',function(data){
	});
	socket.on('chat message',function(msg){
		console.log('message:'+msg);
		io.emit('chat message',msg);
	});
	socket.on('disconnect',function(){
		console.log('user disconnected');
	});
});