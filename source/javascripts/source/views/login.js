import * as form from "../forms/form.js";

const loginView = {

	init() {
		const body = $("body");

		body.append($("<div class='form-container form-style'>" +
				"<form method='post'>" +
					"<div class='form--label'><img src='./images/logo.png' alt='VENote' class='login--logo-image' width='600'/></div>" +
					"<div class='form--text'><input name='username' type='text' placeholder='Username' data-required></div>" +
					"<div class='form--text'><input name='password' type='password' placeholder='Password' data-required></div>" +
					"<div class='form--half'>" +
						"<button type='submit' title='Login' class='login button button--primary button--normal' style='background:forestgreen; margin-top:30px'>" +
							"<span>Login</span>" +
						"</button>" +
					"</div>" +
					"<div class='form--half'>" +
						"<button type='submit' title='Register' class='register button button--primary button--normal' style='background:indianred; margin-top:30px'>" +
							"<span>Register</span>" +
						"</button>" +
					"</div>" +
				"</form>" +
			"</div>"));

		$("button[type='submit']").on("click", function(e, e1, e2) {
			console.log(e);
			console.log(e1);
			console.log(e2);
		})

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
