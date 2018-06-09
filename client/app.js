var Client = require("./ws.js");
var Chat = require("./chat.js");
var cookies = require("js-cookie");
require("./app.scss");

var server = cookies.get("server");

var ws = new Client("ws://" + server);

var chat = new Chat();
chat.focusInput();

chat.onEnter = function(text) {
	chat.appendMessage(Date.now(), text, true);
	ws.send("message", text);
}

ws.on("message", function(data) {
	if (!data.mine) {
		chat.appendMessage(Date.now(), data.text, false);
	}
});

ws.on("connected", function() {
	console.log("Connected to server");
	ws.send("auth", cookies.get("token"));
});
