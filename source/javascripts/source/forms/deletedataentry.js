import * as form from "./form.js";
export * from "./form.js";

export default class DeleteDataEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <DeleteDataEntryFields />;
	}
}

class DeleteDataEntryFields  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.postNewNotebook = this.postNewNotebook.bind(this);
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
	}

	cancel() {

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
