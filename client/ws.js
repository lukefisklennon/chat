var EventEmitter = require("eventemitter3");

class Client extends EventEmitter {
	constructor(address) {
		super();

		this.ws = new WebSocket(address);

		this.ws.onmessage = function(message) {
			message = JSON.parse(message.data);
			this.emit(message.event, message.data)
		}.bind(this);

		this.ws.onopen = function() {
			this.emit("connected");
		}.bind(this);

		this.ws.onclose = function() {
			this.emit("disconnected");
		}.bind(this);
	}

	send(name, message) {
		this.ws.send(JSON.stringify({event: name, data: message}));
	}
}

module.exports = Client;
