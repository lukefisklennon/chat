var dom = require("./dom.js");

class Chat {
	constructor() {
		this.onEnter = null;
		this.element = dom.get("#chat-messages");
		this.input = dom.get("#chat-input");
		this.animationTimeout = null;
		this.animating = false;
		this.messages = [];
		this.input.onkeydown = function(e) {
			if (e.key == "Enter" && this.onEnter != null) {
				var value = this.input.value;
				this.input.value = "";
				this.onEnter(value);
			}
		}.bind(this);
		window.requestAnimationFrame((this.updateScroll).bind(this));
	}

	appendMessage(id, html, mine) {
		this.element.innerHTML += '<div id="message-' + id + '"class="message"><div class="message-profile"></div><div class="message-bubble mine-' + mine + '">' + html + '</div></div><br>';
		this.animateMessages();
		var message = dom.get("#message-" + id);
		this.messages.push(message);
		setTimeout(function() {
			message.querySelector(".message-bubble").style.zIndex = "auto";
		}, 150);
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
		}.bind(this), 20);
		this.animating = true;
		clearTimeout(this.animationTimeout);
		this.animationTimeout = setTimeout(function() {
			this.animating = false;
		}.bind(this), 300);
	}

	updateScroll() {
		if (this.animating) {
			this.element.scrollTop = this.element.scrollHeight;
		}
		window.requestAnimationFrame((this.updateScroll).bind(this));
	}
}

module.exports = Chat;
