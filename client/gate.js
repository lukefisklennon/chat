var dom = require("./dom.js");
var Form = require("./form.js");
require("./gate.scss");

var quickRegister = dom.get("#quick-register");
var quickName = dom.get("#quick-name");

quickRegister.onclick = function() {
	var form = new Form("/register", {
		type: "quick",
		name: quickName.value
	});

	form.on("load", function(res) {
		if (res.ok) {
			location.reload(true);
		}
	});
}
