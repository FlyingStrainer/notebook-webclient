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
		return 	<div>
				<div className="forms header" id="container">
					<h1 className="forms header" id="header-text">Sign Entry</h1>
					<input className="forms header" id="cancel-button" type="button" value="Cancel" onClick={this.cancelCallback}/>
				</div>
				<br />
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
				<div id="signature">
					<TextInput className="forms signature" label="By entering your full name you confirm the validity of this entry." />
				</div>
				<br />
				<input className="forms submitButton" type="submit" value="Sign" onClick={this.submitCallback}/>
			</div>;	
	}
}
