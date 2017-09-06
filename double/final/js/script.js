var socket = io('ws://10.106.18.127:3000');
var local = new Local(socket);
//local.start();
var remote = new Remote(socket);
//remote.start();
socket.on('waiting', function(str) {
	document.getElementById('waiting').innerHTML = str;
})