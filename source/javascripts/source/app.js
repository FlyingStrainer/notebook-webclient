import pages from "./views/pages.js";
import { DataEntryForm } from "./forms/dataentry.js";
import { SignEntryForm } from "./forms/sign.js";
import { CosignEntryForm } from "./forms/cosign.js";
import LoginView from "./views/login.js";
import Notebook from "./models/notebook.js";
import Notebooks from "./views/notebooks.js";
import NotebookPages from "./views/pages.js";
import React from "../lib/react.js";

class VENote extends React.Component {
	constructor(props) {
		super(props);

		this.user = "user_hash1";
		this.notebooks = [new Notebook("notebook_hash1", "Notebook name 1", [], new Date(), new Date(), null, null)];
		this.currentNotebook = this.notebooks[0];

		this.state = {view : props.view, user : ""};

		this.login = this.login.bind(this);
		this.getUser = this.getUser.bind(this);

		this.notebook = this.notebook.bind(this);
		this.getNotebooks = this.getNotebooks.bind(this);
		this.setNotebooks = this.setNotebooks.bind(this);

		this.getCurrentNotebook = this.getCurrentNotebook.bind(this);

		this.back = this.back.bind(this);
		this.logout = this.logout.bind(this);

		this.parentHandler = {getUser : this.getUser, getNotebooks : this.getNotebooks, setNotebooks : this.setNotebooks,
                                getCurrentNotebook : this.getCurrentNotebook, back : this.back, logout : this.logout};
	}

	login(responseJson) {
		//user_hash
		//notebooks -> Array [uuid, name, creation_date, modified_date, ]

		this.user = responseJson.user_hash;
		this.setState({view : "notebookView"});
	}

	getUser() {
		return this.user;
	}

	notebook(notebook) {
        console.log(this.notebooks);
        this.currentNotebook = notebook;
        console.log(this.currentNotebook);
        this.setState({view : "pageView"});
	}

	getNotebooks() {
		return this.notebooks;
	}

	setNotebooks(notebooks) {
		this.notebooks = notebooks;
	}

	getCurrentNotebook() {
	    return this.currentNotebook;
    }

	back(e) {
        if(this.state.view === "pageView")
        {
            this.currentNotebook = undefined;
            this.setState({view : "notebookView"});
        }
	}

	logout(e) {
        this.user = "user_hash1";
        this.notebooks = undefined;

        this.setState({view : ""});
    }

	render() {
		return (<div id="venoteview">
			<div id="renderview">{this.state.view === "notebookView" ? <Notebooks callback={this.notebook} parentHandler={this.parentHandler}/>
				: this.state.view === "pageView" ? <NotebookPages parentHandler={this.parentHandler} /> :
                    <LoginView callback={this.login} />}</div>
			<div id="pushview"></div>
		</div>);
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	ReactDOM.render(<VENote view={document.body.className} />, document.getElementById("root"));
});