import pages from "./views/pages.js";
import { DataEntryForm } from "./forms/dataentry.js";
import { SignEntryForm } from "./forms/sign.js";
import { CosignEntryForm } from "./forms/cosign.js";
import LoginView from "./views/login.js";
import Notebook from "./models/notebook.js";
import Notebooks from "./views/notebooks.js";
import NotebookPages from "./views/pages.js";
import React from "../lib/react.js";

import PushNotification from "./views/subviews/pushnotification.js";

import User from "./models/user.js";

class VENote extends React.Component {
	constructor(props) {
		super(props);

		this.user = new User("user_hash1", {
			role : "manager",
			create_notebooks : true,
			notebooks : [
				{
					notebook_hash : "--notebook-key-1",
					read : true,
					write : false,
					manager : false
				},
				{
					notebook_hash : "--notebook-key-2",
					read : true,
					write : true,
					manager : true
				}]
		}, "SCC", ["--notebook-key-1", "--notebook-key-2"]);
		this.notebooks = [new Notebook("--notebook-key-1", "Notebook name 1", [], new Date(), new Date(), null, null)];
		this.currentNotebook = this.notebooks[0];

		this.state = {view : props.view, pushView : false};

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

		this.user = new User(responseJson.user_hash, responseJson.permissions, responseJson.company_name, responseJson.notebooks);

		if(this.user.permissions.role === "manager")
		{
			this.socket = new WebSocket("ws://endor-vm1.cs.purdue.edu/");

			this.socket.onopen = function() {
				this.socket.send(JSON.stringify({type : "login", user_hash : this.user}));
			}.bind(this);

			this.socket.onmessage = function(event) {
				let msg = JSON.parse(event.data);

				if(msg.type === "failed")
				{
					this.socket.close();
					this.socket = undefined;
				}
				else if(msg.type === "login")
				{
					this.socket.send(JSON.stringify({type:"testpush"}));
					setTimeout(function() {
						this.socket.send(JSON.stringify({type:"testpush"}));
					}.bind(this), 5000);
				}
				else if(msg.type === "push")
				{
					this.push_data = {notebook_hash : msg.msg.notebook_hash, entry_hash : msg.msg.entry_hash};
					this.setState({pushView : true});
				}
				console.log(event);
			}.bind(this);
		}

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
        this.user = undefined;
        this.notebooks = undefined;
        this.currentNotebook = undefined;

        if(this.socket !== undefined)
        {
            this.socket.close();
            this.socket = undefined;
        }

        this.setState({view : "", pushView : false});
    }

	render() {
		return (<div id="venoteview">
			<div id="renderview">{this.state.view === "notebookView" ? <Notebooks callback={this.notebook} parentHandler={this.parentHandler}/>
				: this.state.view === "pageView" ? <NotebookPages parentHandler={this.parentHandler} /> :
                    <LoginView callback={this.login} />}</div>
			<div id="pushview">
				{this.state.pushView ? <PushNotification parentHandler={this.parentHandler} data={this.push_data} /> : null}
			</div>
		</div>);
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	ReactDOM.render(<VENote view={document.body.className} />, document.getElementById("root"));
});
