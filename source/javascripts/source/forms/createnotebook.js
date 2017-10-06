import * as form from "./form.js";
export * from "./form.js";

class CreateNotebookForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <CreateNotebookFields />;
	}
}

class CreateNotebookFields  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.postNewNotebook = this.postNewNotebook.bind(this);
	}
	
	postNewNotebook() {
		console.log("Creating new notebook");
		var notebook = new Notebook("name", "id", [], "Person1");

		fetch('PLACEHOLDER_URL', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'appication/json'
			},
			body: notebook;
		});
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

module.exports = CreateNotebookForm;
