import pages from "./views/pages.js";
import { DataEntryForm } from "./forms/dataentry.js";
import { SignEntryForm } from "./forms/sign.js";
import { CosignEntryForm } from "./forms/cosign.js";
import LoginView from "./views/login.js";
import Notebooks from "./views/notebooks.js";
import React from "../lib/react.js";

class VENote extends React.Component {
	constructor(props) {
		super(props);

		this.user = "user_hash1";
		this.notebooks = undefined;

		this.state = {view : props.view, user : ""};

		this.login = this.login.bind(this);
		this.getUser = this.getUser.bind(this);

		this.notebook = this.notebook.bind(this);
		this.getNotebooks = this.getNotebooks.bind(this);
		this.setNotebooks = this.setNotebooks.bind(this);

		this.back = this.back.bind(this);
		this.logout = this.logout.bind(this);

		this.parentHandler = {getUser : this.getUser, getNotebooks : this.getNotebooks, setNotebooks : this.setNotebooks,
                                back : this.back, logout : this.logout};
	}

	componentDidMount() {
		console.log("MOUNTED");
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

	notebook() {

	}

	getNotebooks() {
		return this.notebooks;
	}

	setNotebooks(notebooks) {
		this.notebooks = notebooks;
	}


	back(e) {

	}

	logout(e) {

    }

	render() {
		return (<div id="venoteview">
			<div id="renderview">{this.state.view === "notebookView" ? <Notebooks callback={this.notebook} parentHandler={this.parentHandler}/>
				: <LoginView callback={this.login} />}</div>
			<div id="pushview"></div>
		</div>);
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	//ReactDOM.render(<VENote view={document.body.className} />, document.getElementById("root"));
	ReactDOM.render(<CosignEntryForm />, document.getElementById("root"));
});
/*
$(document).ready(function() {
	const body = $("body");
	if(body.hasClass("pageview"))
	{
		pages.init();
	}
	else if(body.hasClass("dataEntryView"))
	{
		console.log("data");
//		dataEntryForm.init(document.getElementById("root"));
		var cancel = function() {
			console.log("Cancel");
		}		

		var submit = function(dataEntry) {
			console.log("Submit: " + dataEntry.text);
		}		

		const element = <DataEntryForm cancelCallback={cancel} submitCallback={submit} />;
		console.log(element);
		ReactDOM.render(
			element,
			document.getElementById("root")
		);
	}
	else if (body.hasClass("signEntryView"))
	{
		console.log("sign");
		const element = <SignEntryForm />;
		console.log(element);
		ReactDOM.render(
			element,
			document.getElementById("root")
		);
	}
	else if (body.hasClass("cosignEntryView"))
	{
		console.log("cosign");
		const element = <CosignEntryForm />;
		console.log(element);
		ReactDOM.render(
			element,
			document.getElementById("root")
		);
	}
	else if(body.hasClass("notebookView"))
	{
        notebooks.init();
        notebooks.render();
	}
	else
	{
		loginView.init();
	}
});*/
