import * as form from "./form.js";
import NotebookModel from "../models/notebook.js"
export * from "./form.js";

export default class CreateNotebookForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.cancelCallback = props.cancelCallback;
		this.submitCallback = props.submitCallback;
	}

	render() {
		return <div className="create-notebook-form" id="container">
				<div className="create-notebook-form" id="notebook-header">
					<h1 className="create-notebook-form" id="header-text">Create new notebook</h1>
					<input className="create-notebook-form" id="cancel-button" type="button" value="Cancel" onClick={this.cancelCallback}/>
				</div>
				<CreateNotebookFields submitCallback={this.submitCallback} author={this.author}/>
			</div>
	}
}

class CreateNotebookFields  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.postNewNotebook = this.postNewNotebook.bind(this);
		this.submitCallback=props.submitCallback;
		this.author=props.author;
	}
	
	postNewNotebook() {
		console.log("Creating new notebook");
		var notebook = new NotebookModel("name", "id", [], this.author);

		fetch('PLACEHOLDER_URL', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'appication/json'
			},
			body: notebook
		});
		if(this.submitCallback) {
			this.submitCallback(notebook);
		}
	}

	render() {
		return (<div className="create-notebook-form" id="notebook-form-div">
				<form className="create-notebook-form" id="notebook-form">
					Notebook Name:<br />
					<input className="create-notebook-form" id="notebook-text-box" /><br /><br />

					<input className="create-notebook-form" id="notebook-submit-button" type="button" value="Submit" onClick={this.postNewNotebook} /><br /><br />
				</form>
			</div>);	
	}
}
