var Server = require("./ws.js");
var accounts = require("./accounts.js");
var auth = require("./auth.js");
var config = require("./config.json");

var users = [];

class User {
	constructor(ws) {
		this.ws = ws;
		auth(this, this.onAuth.bind(this));
	}

	onAuth() {
		this.ws.send("");
	}
}

var server = new Server(config.serverPort);
console.log("Server listening on port " + config.serverPort);

server.on("connection", function(ws) {
	users.push(new User(ws));
});
