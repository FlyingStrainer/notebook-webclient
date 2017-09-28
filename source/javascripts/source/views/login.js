import * as form from "../forms/form.js";

const loginView = {

	init() {
		const body = $("body");

		body.append($("<div class='form-container form-style'>" +
				"<form method='post'>" +
					"<div class='form--label'><img src='./images/logo.png' alt='VENote' class='login--logo-image' width='600'/></div>" +
					"<div class='form--text'><input name='username' type='text' placeholder='Username' data-required></div>" +
					"<div class='form--text'><input name='password' type='password' placeholder='Password' data-required></div>" +
				"</form>" +
			"</div>"));

		body.animate({"background-color": "#557FBE"}, 200, function() {

		});

		$("input").focus(function()
		{
			console.log($(this));
		})

	},

	transition() {

	}
};

export * from  "../forms/form.js";
export default loginView;