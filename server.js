var express = require("express");
var cookieParser = require("cookie-parser");
var server = express();
server.use(cookieParser());
server.use(express.static("public"));

var port = 8000;

server.get("*", function(req, res) {
	res.sendFile(__dirname + "/public/gate.html");
});

server.listen(port, function() {
	console.log("Server listening on port " + port);
});
