var assert = require("assert");
var crypto = require("crypto");

var tokenDelim = "_";

class Accounts {
	constructor() {
		this.client = null;
	}

	connect(client) {
		this.client = client;
		this.db = this.client.db("chat");
		this.collection = this.db.collection("accounts");
	}

	registerQuick(name, callback) {
		assert.notEqual(this.client, null);
		var account = new Account({
			registered: false,
			name: name,
			tokens: [new Token()]
		});
		this.collection.insertOne(account, function(error) {
			assert.equal(error, null);
			callback(account);
		});
	}

	auth(token, callback) {
		assert.notEqual(this.client, null);
		var split = token.split(tokenDelim);
		var series = split[0];
		var string = split[1];
		this.collection.findOne({
			"tokens.series": series,
			"tokens.string": string
		}, function(error, account) {
			assert.equal(error, null);
			callback(account);
		});
	}
}

class Account {
	constructor(data) {
		this.registered = data.registered || false;
		this.name = data.name || "Unknown";
		this.tokens = data.tokens || [];
	}
}

class Token {
	constructor() {
		this.created = Date.now();
		this.series = randomString(32);
		this.string = randomString(32);
	}

	toString() {
		return this.series + tokenDelim + this.string;
	}
}

function randomString(n) {
	return crypto.randomBytes(Math.round(n / 2)).toString("hex");
}

module.exports = new Accounts();
