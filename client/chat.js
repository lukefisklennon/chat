var q = require("./q.js");

class Chat {
	constructor() {
		this.onEnter = null;
		this.element = q("#chat-messages");
		this.input = q("#chat-input");
		this.input.onkeydown = function(e) {
			if (e.key == "Enter" && this.onEnter != null) {
				var value = this.input.value;
				this.input.value = "";
				this.onEnter(value);
			}
		}.bind(this);
	}

	appendMessage(html, mine) {
		this.element.innerHTML += '<div class="message"><div class="message-profile"></div><div class="message-bubble mine-' + mine + '">' + html + '</div></div><br>';
		this.animateMessages();
		this.element.scrollTop = this.element.scrollHeight;
	}

	focusInput() {
		this.input.focus();
	}

	animateMessages() {
		this.element.style.transition = "none";
		this.element.style.paddingBottom = (parseInt(this.element.style.paddingBottom, 10) - 65) + "px";
		setTimeout(function() {
			this.element.style.transition = "padding-bottom 300ms cubic-bezier(0.165, 0.84, 0.44, 1)";
			this.element.style.paddingBottom = "81px";
		}.bind(this), 0);
	}
}

module.exports = Chat;
