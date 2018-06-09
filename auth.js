var accounts = require("./accounts.js");

function auth(object, callback) {
	object.auth = false;
	object.account = null;

	object.ws.on("auth", function(token) {
		accounts.auth(token, function(account) {
			if (account != null) {
				object.account = account;
				object.auth = true;
				object.ws.send("auth", true);
				callback();
			} else {
				object.ws.send("auth", false);
			}
		});
	});
}
