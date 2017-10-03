import * as form from "../forms/form.js";
import notebookView from "./notebooks.js";

const loginView = {

	init() {
		const body = $("body");

		body.append($("<div class='form-container form-style login'>" +
				"<form method='post'>" +
					"<div class='form--label'><img src='./images/logo.png' alt='VENote' class='login--logo-image' width='600'/></div>" +
					"<div class='form--text login--id'><input name='email' type='text' placeholder='Email' data-required></div>" +
					"<div class='form--text login--id'><input name='password' type='password' placeholder='Password' data-required><span id='badlogin' style='display:none'>Your email/password was incorrect</span></div>" +
					"<div class='form--text register--id' style='display:none;'><input name='email' type='text' placeholder='Email' data-required></div>" +
					"<div class='form--text register--id' style='display:none;'><input name='password' type='password' placeholder='Password' data-required></div>" +
					"<div class='form--text register--id' style='display:none;'><input name='confirmpassword' type='password' placeholder='Confirm Password' data-required></div>" +
					"<div class='form--text register--id' style='display:none;'><input name='companyid' type='number' placeholder='Company ID' data-required></div>" +
					"<div class='form--half'>" +
						"<button type='submit' title='Login' class='login button button--primary button--normal' style='background:forestgreen; margin-top:20px'>" +
							"<span>Login</span>" +
						"</button>" +
					"</div>" +
					"<div class='form--half'>" +
						"<button type='submit' title='Register' class='register button button--primary button--normal' style='background:indianred; margin-top:20px'>" +
							"<span>Register</span>" +
						"</button>" +
					"</div>" +
				"</form>" +
			"</div>"));

		const loginfields = body.find(".login--id");
		const badlogin = loginfields.find("#badlogin");
		const registerfields = body.find(".register--id");

		let loginMode = 0;

		let loginTransition = 1;

		$("button[type='submit']").on("click", function(e, e1, e2) {
			if(loginTransition === 1)
			{
				if(loginMode === 0)
				{
					if($(this).attr("title") === "Register")
					{
						loginMode = 1;

						loginfields.hide(500, function() {
							if($(this).is(loginfields.first()))
							{
								badlogin.hide();
								registerfields.show(500, function() {
									if($(this).is(registerfields.first()))
									{

									}
								});
							}
						});
					}
					else
					{
						let random = Math.random();
						if(random < .5)
							badlogin.show(300);
						else
						{
							body.find(".form-container").hide(500, function() {
								body.html('');
								notebookView.init();
							})
						}
						//DO TRANSITION TO NEXT PAGE
					}
				}
				else
				{
					if($(this).attr("title") === "Login")
					{
						loginMode = 0;
						registerfields.hide(500, function()
						{
							if ($(this).is(registerfields.first()))
							{
								loginfields.show(500, function ()
								{
									if ($(this).is(loginfields.first()))
									{

									}
								});
							}
						});
					}
					else
					{
						//DO TRANSITION TO NEXT PAGE
					}
				}
			}
			e.preventDefault();
		});
	},

	transition() {

	}
};

export * from  "../forms/form.js";
export default loginView;
