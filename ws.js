var WebSocketServer = require("uws").Server;
var EventEmitter = require("events").EventEmitter;

class Server {
	constructor(port) {
		this.wss = new WebSocketServer({port: port});
	}

	on(name, callback) {
		if (name === "connection") {
			this.wss.on("connection", function(ws) {
				callback(new Connection(ws));
			});
		}
	}
}

class Connection {
	constructor(ws) {
		this.ws = ws;
		this.events = new EventEmitter();

		this.ws.on("message", function(message) {
			message = JSON.parse(message);
			this.events.emit(message.event, message.data)
		}.bind(this));

		this.ws.on("close", function() {
			this.events.emit("disconnect");
		}.bind(this));
	}

	on(name, callback) {
		this.events.on(name, callback);
	}

	send(name, message) {
		this.ws.send(JSON.stringify({event: name, data: message}));
	}
}

module.exports = Server;
