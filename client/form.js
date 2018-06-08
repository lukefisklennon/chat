var EventEmitter = require("eventemitter3");

class Form extends EventEmitter {
	constructor(url, data) {
		super();

		this.request = new XMLHttpRequest();
		this.encodedData = "";
	    this.dataPairs = [];

		for (name in data) {
			this.dataPairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
		}

		this.encodedData = this.dataPairs.join("&").replace(/%20/g, "+");

		this.request.onload = function(e) {
			var data = this.request.responseText;
			try {
				data = JSON.parse(data);
			} catch(e) {}
			this.emit("load", data);
		}.bind(this);

		this.request.onerror = function(e) {
			this.emit("error");
		}.bind(this);

		this.request.open("POST", url);
		this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		this.request.send(this.encodedData);
	}
}

module.exports = Form;
