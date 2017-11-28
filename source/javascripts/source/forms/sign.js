import React from "../../lib/react.js";

import TextInput from "./dataentry.js";
export * from "./form.js";

export default class SignEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.cancelCallback = props.cancelCallback;
		this.submitCallback = props.submitCallback;
		this.sign = this.sign.bind(this);
	}

	sign() {
		console.log("cosign");

		var body = JSON.stringify({
                	user_hash: this.entry["user_hash"],
	                notebook_hash: this.notebook["notebook_hash"],
		         entry_hash: this.entry["entry_hash"]
		});
		console.log(body);
		fetch('http://endor-vm1.cs.purdue.edu/cosignEntry', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: body
		}).then(function(response){
			if (response.ok) {
				//var json = response.json();
				//console.log(json);
				//return json;
			}
			//console.log("Cosign failed");
		});	

		if (this.submitCallback) {
			this.submitCallback();
		}
	}

	//<input className="forms header" id="cancel-button" type="button" value="Cancel" onClick={this.cancelCallback}/>
	render() {
		return 	<div>
				<div className="forms header" id="container">
					<h1 className="forms header" id="header-text">Sign Entry</h1>
				</div>
				<br />
				<br />
				<SignEntryFields submitCallback={this.sign} author={this.author}/>
			</div>;
	}
}

export class SignEntryFields extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.submitCallback=props.submitCallback;
		this.author=props.author;
	}
	
	render() {
		return 	<div>
				<div id="signature">
					<TextInput className="forms signature" label="By entering your full name you confirm the validity of this entry." />
				</div>
				<br />
				<input className="forms submitButton" type="submit" value="Sign" onClick={this.submitCallback}/>
			</div>;	
	}
}
