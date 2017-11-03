import React from "../../lib/react.js";
import Button from "./subviews/button.js";
import * as Form from "../forms/form.js";

export default class LoginView extends React.Component {
	constructor(props) {
		super(props);

		this.callback = props.callback;

		this.loginState = 0;
		this.storedValues = {};

		this.state = {buttonState: "stateLoad "};

		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this);
		this.recover = this.recover.bind(this);
		this.register = this.register.bind(this);

		console.log("LOGIN VIEW");
	}

	componentDidMount() {
		setTimeout(function() {
            this.setState({buttonState: "stateLoad stateTransition "});
            setTimeout(function() {
            	this.setState({buttonState: ""});
            }.bind(this), 300);
		}.bind(this), 300);
	}

	handleChange(event) {
	    this.storedValues[event.target.name] = event.target.value;
	}

	login(event) {
	    if(this.loginState === 0)
        {
        	if(Form.InputEnum.EMAIL(this.storedValues["email"]) && Form.InputEnum.TEXT(this.storedValues["password"]))
	        {
		        fetch("http://endor-vm1.cs.purdue.edu/user", {
			        method: "POST",
			        headers: {
				        "Accept": "application/json",
				        "Content-Type": "application/json"
			        },
			        body: {
				        "username" : this.storedValues["email"],
				        "password" : this.storedValues["password"]
			        }
		        }).then(function(response) {
			        if(response.ok) {
				        return response.json();
			        }
			        throw new Error("Network response was not ok.");
		        }).then(function(json) {
			        this.setState({buttonState : "stateExit stateTransition "});
			        setTimeout(function(){
			        	this.callback(json);
			        }.bind(this), 300);
		        }.bind(this)).catch(function(error) {
			        this.setState({buttonState: "stateLoginInvalid "});
			        console.log(error.message);
		        }.bind(this));
	        }
	        else
	        {
		        this.setState({buttonState: "stateLoginInvalid "});
	        }
        }
        else
        {
            this.setState({buttonState: ""});
            this.loginState = 0;
        }
    }

    recover(event) {
		if(this.loginState === 0)
		{
			this.setState({buttonState : "stateRecovery "});
			this.loginState = 1;
		}
        else if(this.loginState === 1)
        {

        }
    }

    register(event) {
	    console.log("REGISTER");
	    if(this.loginState === 2)
        {

        }
        else
            this.setState({buttonState: "stateRegister "});

        this.loginState = 2;
    }

	render() {
		return (<div className={this.state.buttonState + "login-view form-container form-style"}>
			<form>
				<div className="form--label"><img src="./images/logo.png" alt="VENote" class="login--logo-image" width="600" /></div>
				<div className="form--text login--email"><input name="email" type="text" placeholder="Email" onChange={this.handleChange} /></div>
				<div className="form--text login--password"><input name="password" type="password" placeholder="Password" onChange={this.handleChange} /></div>
				<div className="form--label login--invalid"><a onClick={this.recover}>Your email/password was incorrect</a></div>
				<div className="form--text register--password"><input name="confirmpassword" type="password" placeholder="Confirm Password" onChange={this.handleChange} /></div>
				<div className="form--text register--company"><input name="companyid" type="number" placeholder="Company ID" onChange={this.handleChange} /></div>

				<Button wrapperClass="login" type="submit" title="Login" onClick={this.login}/>
				<Button wrapperClass="login--recover" type="submit" title="Recover" onClick={this.recover}/>
				<Button wrapperClass="login--register" type="submit" title="Register" onClick={this.register}/>
			</form>
		</div>);
	}
}

const loginView = {

	init() {
		const body = $("#renderview");

		/*const form = $("<div class='form-container form-style login' style='display:none;'>" +
							"<form method='post'>" +
								"<div class='form--label'><img src='./images/logo.png' alt='VENote' class='login--logo-image' width='600'/></div>" +
								"<div class='form--text login--id'><input name='email' type='text' placeholder='Email' data-required></div>" +
								"<div class='form--text login--id'><input name='password' type='password' placeholder='Password' data-required><a id='badlogin' style='display:none'>Your email/password was incorrect</a></div>" +
								"<div class='form--text register--id' style='display:none;'><input name='confirmpassword' type='password' placeholder='Confirm Password' data-required></div>" +
								"<div class='form--text register--id' style='display:none;'><input name='companyid' type='number' placeholder='Company ID' data-required></div>" +
								"<div id='loginbutton' style='padding-right:10px; width:50%; margin-left:0; margin-right:0; float:left'>" +
									"<button type='submit' title='Login' class='login button button--primary button--normal' style='background:forestgreen; margin-top:20px'>" +
										"<span>Login</span>" +
									"</button>" +
								"</div>" +
								"<div class='form--third' id='recoverbutton'>" +
									"<button type='submit' title='Recover' class='recover button button--primary button--normal' style='background:orange; margin-top:20px; display:none'>" +
										"<span>Recover</span>" +
									"</button>" +
								"</div>" +
								"<div id='registerbutton' style='padding-left:10px; margin-right:0; margin-left:0; float:right; width:50%'>" +
									"<button type='submit' title='Register' class='register button button--primary button--normal' style='background:indianred; margin-top:20px'>" +
										"<span>Register</span>" +
									"</button>" +
								"</div>" +
							"</form>" +
						"</div>");

		body.append(form);*/

		ReactDOM.render(
			<LoginView />,
			body[0]
		);

		/*const form = $(".form-container.login");


		form.show(500);

		const loginfields = body.find(".login--id");
		const badlogin = loginfields.find("#badlogin");
		const registerfields = body.find(".register--id");

		const loginbutton = body.find("#loginbutton");
		const recoverbutton = body.find("#recoverbutton");
		const registerbutton = body.find("#registerbutton");

		let loginMode = 0;

		badlogin.on("click", function(e) {
			$(this).hide(300);
			loginMode = 2;
			loginfields.last().hide(300);
			loginbutton.animate({'padding-right':'13px', 'width':'33%'}, 150);
			registerbutton.animate({'padding-left':'13px', 'width':'33%'}, 150, function() {
				recoverbutton.children().show(300);
			});
			e.preventDefault();
		});

		$("button[type='submit']").on("click", function(e) {
			if($(this).attr("title") === "Recover" && loginMode === 2)
			{
				//RECOVER ACCOUNT HERE
			}
			else
			{
				if(loginMode === 2)
				{
					recoverbutton.children().hide(150, function() {
						registerbutton.animate({'padding-left':'10px', 'width':'50%'}, 300);
						loginbutton.animate({'padding-right':'10px', 'width':'50%'}, 300);
					});
				}
				if($(this).attr("title") === "Register")
				{
					if(loginMode === 0 || loginMode === 2)
					{
						loginMode = 1;
						loginfields.show(300);
						badlogin.hide();
						registerfields.show(300);
					}
					else
					{
						//REGISTER ACCOUNT HERE
						console.log($("input[name='email']").val());
						socket.send(JSON.stringify({"msgType" : "register", "data" : {"email" : $("input[name='email']").val()}}));
					}
				}
				else if($(this).attr("title") === "Login")
				{
//					socket.onmessage = function(event)
//					{

//					}

//					socket.send(JSON.stringify({"msgType" : "login", "data" : {"email" : $("input[name='email']").val(), "password" : $("input[name='password']").val()}}));

					if(loginMode > 0)
					{
						loginMode = 0;
						loginfields.show(300);
						registerfields.hide(300);
					}
					else
					{
						let random = Math.random();
						if(random < .5)
							badlogin.show(300);
						else
						{
							notebookView.init();
							body.find(".form-container").hide(500, function() {
							   $(this).remove();
							   notebookView.render();
							});
						}
					}
				}
			}
			e.preventDefault();
		});*/
	}
};

//export * from  "../forms/form.js";
//export default loginView;
