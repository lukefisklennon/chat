var config = require("./config.json");
var Server = require("./network.js");

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

	on(name, callback) {
		server.on(name, (callback).bind(this));
	}
}

var server = new Server(config.chat.port);
console.log("Chat server listening on port " + config.chat.port);

var chat = new Chat();

server.on("connection", function(ws) {
	chat.addUser(ws);
});
