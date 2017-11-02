import LoginView from "./views/login.js";
import Notebooks from "./views/notebooks.js";
import React from "../lib/react.js";

class VENote extends React.Component {
	constructor(props) {
		super(props);

		this.user = undefined;
		this.notebooks = undefined;

		this.state = {view : props.view, user : ""};

		this.login = this.login.bind(this);
		this.getUser = this.getUser.bind(this);

		this.notebook = this.notebook.bind(this);
		this.getNotebooks = this.getNotebooks.bind(this);

		this.back = this.back.bind(this);
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


	back() {

	}

	render() {
		return (<div id="venoteview">
			<div id="renderview">{this.state.view === "notebookView" ? <Notebooks callback={this.notebook} user={this.getUser} getNotebooks={this.getNotebooks} setNotebooks={this.setNotebooks} />
				: <LoginView callback={this.login} />}</div>
			<div id="pushview"></div>
		</div>);
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	ReactDOM.render(<VENote view={document.body.className} />, document.getElementById("root"));
});
/*
$(document).ready(function() {
	const body = $("body");
	if(body.hasClass("pageview"))
	{
		pages.init();
	}
	if(body.hasClass("dataEntryView"))
	{
//		dataEntryForm.init(document.getElementById("root"));
		var cancel = function() {
			console.log("Cancel");
		}		

		var submit = function(dataEntry) {
			console.log("Submit: " + dataEntry.text);
		}		

		const element = <DataEntryForm cancelCallback={cancel} submitCallback={submit} />;
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
