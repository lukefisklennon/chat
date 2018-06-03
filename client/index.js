var Client = require("./network.js");
var Chat = require("./chat.js");

var ws = new Client("ws://10.1.1.4:3000");

var chat = new Chat();
chat.focusInput();

chat.onEnter = function(text) {
	chat.appendMessage(text, true);
	ws.send("message", text);
}

ws.on("message", function(data) {
	if (!data.mine) {
		chat.appendMessage(data.text, false);
	}
});
