var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var accounts = require("./accounts.js");
var config = require("./config.json");

MongoClient.connect(config.dbAddress, function(error, client) {
	assert.equal(error, null);
	console.log("Connected to database");
	accounts.connect(client);
});

var server = express();
server.use(bodyParser.urlencoded({extended: true}));
server.use(cookieParser());
server.use(express.static("public"));

function serveApp(res) {
	res.sendFile(__dirname + "/public/app.html");
}

function serveGate(res) {
	res.sendFile(__dirname + "/public/gate.html");
}

server.get("/", function(req, res) {
	if ("token" in req.cookies) {
		accounts.auth(req.cookies.token, function(account) {
			if (account != null) {
				serveApp(res);
			} else {
				serveGate(res);
			}
		});
	} else {
		serveGate(res);
	}
});

server.post("/register", function(req, res) {
	var data = req.body;
	accounts.registerQuick(data.name, function(account) {
		res.cookie("token", account.tokens[0].toString(), {
			maxAge: config.tokenMaxAge * 24 * 60 * 60 * 1000,
			httpOnly: true
		});
		res.json({ok: true});
	});
});

server.listen(config.serverPort, function() {
	console.log("Server listening on port " + config.serverPort);
});
