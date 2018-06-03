var EventEmitter = require("eventemitter3");

class Client {
	constructor(address) {
		this.ws = new WebSocket(address);
		this.events = new EventEmitter();

		this.ws.onmessage = function(message) {
			message = JSON.parse(message.data);
			this.events.emit(message.event, message.data)
		}.bind(this);

		this.ws.onclose = function() {
			this.events.emit("disconnect");
		}.bind(this);
	}

	on(name, callback) {
		this.events.on(name, callback);
	}

	send(name, message) {
		this.ws.send(JSON.stringify({event: name, data: message}));
	}
}

module.exports = Client;
