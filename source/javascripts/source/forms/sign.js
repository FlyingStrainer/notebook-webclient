import * as form from "./form.js";
import NotebookModel from "../models/notebook.js"
import { TextInput } from "./dataentry.js";
import { SubmitButton } from "./dataentry.js";
export * from "./form.js";

export class SignEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.cancelCallback = props.cancelCallback;
		this.submitCallback = props.submitCallback;
	}

	render() {
		return 	<div id="container">
				<div>
					<h1 className="forms header" id="header-text">Sign Entry</h1>
					<input className="forms header" id="cancel-button" type="button" value="Cancel" onClick={this.cancelCallback}/>
				</div>
				<br />
				<SignEntryFields className="forms" submitCallback={this.submitCallback} author={this.author}/>
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
				<TextInput label="By entering your full name you confirm the validity of this entry." />
				<br />
				<input className="forms" type="submit" value="sign" onClick={this.submitCallback}/>
			</div>;	
	}
}
