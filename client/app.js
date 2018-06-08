var Client = require("./network.js");
var Chat = require("./chat.js");
require("./app.scss");

var ws = new Client("ws://localhost:3000");

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
