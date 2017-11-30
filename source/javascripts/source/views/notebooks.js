import React from "../../lib/react.js";
import ToolbarView from "./subviews/toolbar";
import Notebook from "../models/notebook.js";
import Button from "./forms/button.js";
import * as Utils from "../utils.js";
import User from "../models/user.js";
import CreateNotebookForm from "./forms/createnotebook.js";

export default class NotebooksView extends React.Component {
	constructor(props) {
		super(props);

		this.parent = props.parentHandler;
		this.callback = props.callback;

		this.state = { notebookList : [], close : false, notebookState : "stateLoad " };

		this.notebookListSearch = this.notebookListSearch.bind(this);

		this.register = this.register.bind(this);

		this.openNotebook = this.openNotebook.bind(this);

		this.logout = this.logout.bind(this);

        this.parentToolbar = { searchHandler : this.notebookListSearch, backCallback : this.parent.back, logoutCallback : this.logout };
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

	notebookListSearch() {

    }

    register(responseJson) {
	    this.setState({ notebookList: this.state.notebookList.concat(new Notebook(responseJson.notebook_hash, responseJson)) });
	    this.parent.getUser().permissions.notebooks[responseJson.notebook_hash] = {read : true, write : true, manager : true};
	    this.parent.setNotebooks(this.state.notebookList);
	    console.log(this.parent.getUser());
	    console.log(this.parent.getUser().permissions.notebooks);
    }


    openNotebook(notebook) {
	    console.log(this.state.notebookList);
        this.create_notebook.hideCreateNotebook();
	    this.setState({ notebookState : "stateExit stateTransition ", close : true });
        console.log(this.state.notebookList);

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
			<ToolbarView dataIntro="Click the Magnifying glass to search. Click the button to it's right to logout" dataStep="3" page={this.parent.getUser().company_name} parentHandler={this.parentToolbar} visible={this.state.close} hasRenderSetting={false} hasShare={false} hasBack={false}/>
            <div data-intro="Click on an existing notebook to add or view data entries inside" data-step="2" className={this.state.notebookState + "list-view"}>
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

class NotebookView extends React.Component {
	constructor(props) {
		super(props);

		this.parent = props.parentHandler;
		this.notebook = props.notebook;

		this.state = {notebookState : "stateLoad "};
	}

	componentDidMount() {
	    this.mounted = true;
        setTimeout(function() {
            if(this.mounted) {
                this.setState({ notebookState: "stateLoad stateTransition " });

                setTimeout(function() {
                    if(this.mounted && this.state.notebookState === "stateLoad stateTransition ")
                        this.setState({ notebookState: "" });

                }.bind(this), 300);
            }
        }.bind(this), 300);
    }

    componentWillUnmount() {
	    this.mounted = false;
    }

    render() {
        return (<a className={this.state.notebookState + "notebooks--notebook"} onClick={e => (e.preventDefault(), this.parent.openNotebook(this.notebook))}>
            <div className="notebook--title">{this.notebook.name}</div>
            <div className="notebook--scribbles" />
        </a>);
	}
}
