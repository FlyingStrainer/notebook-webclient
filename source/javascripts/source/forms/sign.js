import * as form from "./form.js";
import NotebookModel from "../models/notebook.js"
import Text from "./dataentry.js";
import Button from "./dataentry.js";
export * from "./form.js";

export default class SignEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.cancelCallback = props.cancelCallback;
		this.submitCallback = props.submitCallback;
	}

	render() {
		return <div id="container">
				<div>
					<h1 id="header-text">Sign Entry</h1>
					<input id="cancel-button" type="button" value="Cancel" onClick={this.cancelCallback}/>
				</div>
				HELLO WORLD	
				<SignEntryFields.SignEntryFields submitCallback={this.submitCallback} author={this.author}/>
				GOODBYE
			</div>
	}
}

class SignEntryFields extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.submitCallback=props.submitCallback;
		this.author=props.author;
	}
	
	render() {
		return (<div>
				WHAT
					<Text.TextInput label="By entering your full name you confirm the validity of this entry." />
				WHY
					<br />
					<Submit.SubmitButton label="Sign" submissionHandler={this.submitCallback} />
				HOW
			</div>);	
	}
}
