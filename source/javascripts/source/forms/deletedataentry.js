import React from "../../lib/react.js";

export default class DeleteDataEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.submitCallback = props.submitCallback;
		this.cancelCallback = props.cancelCallback;
		this.dataEntry = props.dataEntry;
	}

	render() {
		return <div className="delete-entry-form" id="container">
				<div className="delete-entry-form" id="notebook-header">
					<h1 className="delete-entry-form" id="header-text">Delete entry</h1>
					<input className="delete-entry-form" id="cancel-button" type="button" value="Cancel" onClick={this.cancelCallback}/>
				</div>
				<DeleteDataEntryFields submitCallback={this.submitCallback} />
			</div>
	}
}

class DeleteDataEntryFields  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.confirm = this.confirm.bind(this);
		this.cancel = this.cancel.bind(this);
		this.submitCallback = props.submitCallback;
		this.dataEntry = props.dataEntry;
	}

	confirm() {
		console.log("Creating new notebook");
		var notebook = new Notebook("name", "id", [], "Person1");

		fetch('PLACEHOLDER_URL', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'appication/json'
			},
			body: notebook
		});

		if (this.submitCallback) {
			this.submitCallback(this.dataEntry);
		}
	}

	cancel() {
		if (this.cancelCallback) {
			this.cancelCallback(null);
		}
	}

	render() {
		return (<div className="create-notebook-form" id="notebook-form-div">
			<form className="create-notebook-form" id="notebook-form">
				<input className="create-notebook-form" id="notebook-submit-button" type="button" value="Confirm" onClick={this.confirm} /><br /><br />
				<input className="create-notebook-form" id="notebook-submit-button" type="button" value="Cancel" onClick={this.cancel} /><br /><br />
			</form>
		</div>);
	}
}
