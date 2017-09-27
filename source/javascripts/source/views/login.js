import * as form from "../forms/form.js";

const loginView = {

	init() {
		const body = $("body");

		body.append($("<div class='login--container'>" +
			"<img src='/images/logo.png' alt='VENote' class='login--logo-image' />" +
			"<div class='login--signin-form'>" +
			"<span class='login--signin--header'>LOGIN</span>" +
			"<div class='login--signin--login'></div>" +
			"<div class='login--signin--register'></div>" +
			"</div>" +
			"<div class='login--register-form'>" +
			"<div class='login--register--header'></div>" +
			"<div class='login--register--register'></div>" +
			"<div class='login--register--back'></div>" +
			"</div>" +
			"</div>"));

		body.animate({"background-color": "#557FBE"}, 200, function() {

		});

	},

	transition() {

	}
};

export * from  "../forms/form.js";
export default loginView;