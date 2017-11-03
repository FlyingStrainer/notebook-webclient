import React from "../../lib/react.js";
import Button from "./subviews/button.js";
import * as Form from "../forms/form.js";
import TagsInput from "../../lib/react-tagsinput.js";

export default class LoginView extends React.Component {
	constructor(props) {
		super(props);

		this.callback = props.callback;

		this.loginState = 0;
		this.storedValues = {};

		this.state = {buttonState: "stateLoad ", tags : []};

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
		        fetch("http://endor-vm1.cs.purdue.edu/login", {
			        method: "POST",
			        headers: {
				        "Accept": "application/json",
				        "Content-Type": "application/json"
			        },
			        body: JSON.stringify({
				        email : this.storedValues["email"],
				        password : this.storedValues["password"]
			        })
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
                <TagsInput value={this.state.tags} onChange={e => (this.setState({tags : e}))}  />
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