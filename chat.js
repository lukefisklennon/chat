var Server = require("./ws.js");
var config = require("./config.json");

class Chat {
	constructor() {
		this.users = [];
	}

	addUser(ws) {
		this.users.push(ws);
		ws.on("disconnect", function() {
			this.users.splice(this.users.indexOf(ws), 1);
		}.bind(this));
		ws.on("message", function(text) {
			for (var i = 0; i < this.users.length; i++) {
				var data = {text: text, mine: false};
				if (this.users[i] == ws) {
					data.mine = true;
				}
				this.users[i].send("message", data);
			}
		}.bind(this));
	}
}

var server = new Server(config.chatPort);
console.log("Chat server listening on port " + config.chatPort);

var chat = new Chat();

server.on("connection", function(ws) {
	chat.addUser(ws);
});
