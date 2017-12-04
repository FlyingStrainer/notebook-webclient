import React from "../../lib/react.js";

import Notebook from "../models/notebook.js";

import ToolbarView from "./subviews/toolbar.js";
import NotebookView from "./subviews/notebook.js";

import CreateNotebookForm from "./forms/createnotebook.js";

import * as Utils from "../utils.js";

export default class NotebooksView extends React.Component {
	constructor(props) {
		super(props);

		this.parent = props.parentHandler;
		this.callback = props.callback;

		this.state = { notebookList : [], close : false, notebookState : "stateLoad " };

		this.notebookSearch = this.notebookSearch.bind(this);

		this.register = this.register.bind(this);

		this.manager = this.manager.bind(this);

		this.openNotebook = this.openNotebook.bind(this);

		this.logout = this.logout.bind(this);

        this.load = props.load;

		this.parentToolbar = { backCallback : this.parent.back, logoutCallback : this.logout, user_hash : this.parent.getUser().user_hash, query : this.notebookSearch, manager : this.manager };
		this.parentNotebook = { openNotebook : this.openNotebook };
	}

	componentDidMount() {
		let notebookCount = this.parent.getUser().notebooks.length;
		const notebooks = [];

		let flag = false;

		setTimeout(function() {
			this.setState({ notebookState: "stateLoad stateTransition " });

			setTimeout(function() {
				if(this.state.notebookState === "stateLoad stateTransition ")
					this.setState({ notebookState: "" });

			}.bind(this), 300);
		}.bind(this), 300);

		this.parent.getUser().notebooks.forEach(function(notebook_uuid) {

			Utils.post("getNotebook", { user_hash : this.parent.getUser().user_hash, notebook_hash : notebook_uuid }, function(json) {

				flag = true;

				notebooks.push(new Notebook(notebook_uuid, json));

				notebooks.sort(function(n1, n2) {
					return n2.date_modified_real - n1.date_modified_real;
				});

				this.setState({ notebookList : notebooks.slice() });

				notebookCount--;
				if(notebookCount === 0)
					this.parent.setNotebooks(notebooks);

			}.bind(this));

		}.bind(this));

		if(!flag) {
			this.setState({ notebookList : this.parent.getNotebooks() });
		}
	}

	displayNotebooks(results) {
	    console.log(results);

		if(!results) {
			alert("Could not find any notebooks!");
			return;
		}

		this.setState({ notebookList : [] });

		results.forEach(function(notebook) {

			const foundNotebook = this.parent.getNotebooks().find(function(n) {
				return n.notebook_hash === notebook.notebook;
			});

			this.setState({ notebookList : this.state.notebookList.concat(foundNotebook) });

		}.bind(this));
	}

	notebookSearch(mode, text, date1, date2, tags, tag) {
		if(mode === "stateText ") {
            Utils.post("searchByText", { user_hash : this.parent.getUser().user_hash, text : text }, function(json) {
                this.displayNotebooks(json.results);
            }.bind(this), (error) => {console.log(error)});
		}
		else if(mode === "stateTimestamp ") {
			Utils.post("searchByDate", { user_hash : this.parent.getUser().user_hash, mindate : date1.getTime(), maxdate  : date2.getTime()}, function(json) {
				this.displayNotebooks(json.results)
			}.bind(this));
		}
		else {
			Utils.post("searchByTag", { user_hash : this.parent.getUser().user_hash, tag : tags.concat(tag) }, function(json) {
				this.displayNotebooks(json.results);
			});
		}
	}

	manager() {
		this.create_notebook.hideCreateNotebook();
		this.setState({ pageState : "stateExit stateTransition ", query : false });

		setTimeout(function() {
			this.parent.manager();
		}.bind(this), 300);
	}

	register(responseJson) {
		const notebooks = this.state.notebookList;

		notebooks.push(new Notebook(responseJson.notebook_hash, responseJson));

		notebooks.sort(function(n1, n2) {
			return n2.date_modified_real - n1.date_modified_real;
		});

		this.setState({ notebookList: notebooks });
		this.parent.getUser().permissions.notebooks[responseJson.notebook_hash] = { read : true, write : true, manager : true };
		this.parent.setNotebooks(this.state.notebookList);
	}


	openNotebook(notebook) {
		this.create_notebook.hideCreateNotebook();
		this.setState({ notebookState : "stateExit stateTransition ", close : true });

		setTimeout(function(){
			this.callback(notebook);
		}.bind(this), 300);
	}

	logout(event) {
		this.create_notebook.hideCreateNotebook();
		this.setState({ notebookState : "stateExit stateTransition ", close : true });

		setTimeout(function(){
			this.parent.logout(event);
		}.bind(this), 300);
	}

	render() {
		return (<div className="notebooks-view">
			<ToolbarView dataIntro="Click the suit to manage user permissions. Click the magnifying glass to search. Click button to the far right to log out." dataStep="3" load={this.load}
			             page={this.parent.getUser().company_name} parentHandler={this.parentToolbar} visible={this.state.close}
			             query={true} isManager={this.parent.getUser().permissions.role === "admin"} />
			<div data-intro="Click on an existing notebook to add or view data entries inside. Click on the bottom left blue button to send feedback." data-step="2" className={this.state.notebookState + "list-view"}>
				{this.parent.getUser().permissions.create_notebooks ?
					<div data-intro="Click to create a new notebook" data-step="1" className="notebooks--notebook create" onClick={() => {
						if(this.parent.getUser().permissions.create_notebooks)
							this.create_notebook.showCreateNotebook();
					}}>
						<div className="create-icon" />
					</div> : null}
				<div className="notebooks--notebook-list">
					{this.state.notebookList.map(notebook => (
						<NotebookView parentHandler={this.parentNotebook} notebook={notebook} visible={this.state.close} key={notebook.notebook_hash}/>
					))}
				</div>
			</div>
			<CreateNotebookForm user_hash={this.parent.getUser().user_hash} submitCallback={this.register} ref={form => (this.create_notebook = form)} />
			<a className="intro-btn" href="#" onClick={e => (e.preventDefault(), introJs().start())} />
		</div>);
	}
}

