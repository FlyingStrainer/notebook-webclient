import React from "../../lib/react.js";
import ToolbarView from "./subviews/toolbar";
import Notebook from "../models/notebook.js";
import Button from "./subviews/button.js";
import * as Utils from "../utils.js";
import User from "../models/user.js";

export default class NotebooksView extends React.Component {
	constructor(props) {
		super(props);

		this.parent = props.parentHandler;
		this.callback = props.callback;

		this.state = { notebookList : [], close : false, createNotebookState : "stateLoad " };

		this.notebookListSearch = this.notebookListSearch.bind(this);

		this.toggleCreateNotebook = this.toggleCreateNotebook.bind(this);

		this.register = this.register.bind(this);

		this.openNotebook = this.openNotebook.bind(this);

		this.logout = this.logout.bind(this);

        this.parentToolbar = { searchHandler : this.notebookListSearch, backCallback : this.parent.back, logoutCallback : this.logout };
        this.parentNotebook = { openNotebook : this.openNotebook };
	}

	componentDidMount() {
		let notebookCount = this.parent.getUser().notebooks.length;
		let notebooks = [];

		this.parent.getUser().notebooks.forEach(function(notebook_uuid) {

			Utils.post("getNotebook", { user_hash : this.parent.getUser().user_hash, notebook_hash : notebook_uuid }, function(json) {

				notebooks.push(new Notebook(notebook_uuid, json));

				this.setState({ notebookList : notebooks.slice() });

				notebookCount--;
				if(notebookCount === 0)
					this.parent.setNotebooks(notebooks);

			}.bind(this));

		}.bind(this));
	}

	notebookListSearch() {

    }

    toggleCreateNotebook() {
        if((this.state.createNotebookState === "stateHide " || this.state.createNotebookState === "stateLoad ") && this.parent.getUser().permissions.create_notebooks)
        {
        	this.notebookNameInput.value = "";
	        this.setState({createNotebookState : "stateShow "});
        }
        else
        {
	        this.setState({createNotebookState : "stateHide "});
        }
    }

    register() {
		console.log("REGISTER");

		this.notebookNameInput.value = "";
		this.setState({createNotebookState : "stateHide "});
    }

    openNotebook(notebook) {
	    this.setState({ notebookList : this.state.notebookList.slice(), createNotebookState : "stateHide ", close : true });

	    setTimeout(function(){
		    this.callback(notebook);
	    }.bind(this), 300);
    }

    logout(event) {
	    this.setState({ notebookList : this.state.notebookList.slice(), createNotebookState : "stateHide ", close : true });

	    setTimeout(function(){
            this.parent.logout(event);
        }.bind(this), 300);
    }

	render() {
		return (<div className="notebooks-view">
			<ToolbarView page={this.parent.getUser().company_name} parentHandler={this.parentToolbar} visible={this.state.close} hasBack={false}/>
            <div className="list-view">
	            {this.parent.getUser().permissions.create_notebooks ?
	            <div className="notebooks--notebook notebooks--create-notebook" onClick={this.toggleCreateNotebook}>
		            <div className="notebook--create-icon" />
	            </div> : null}
                <div className="notebooks--notebook-list">
                    {this.state.notebookList.map(notebook => (
                        <NotebookView parentHandler={this.parentNotebook} notebook={notebook} visible={this.state.close}/>
                    ))}
                </div>
            </div>
			<div className={this.state.createNotebookState + "overlay"} onClick={this.toggleCreateNotebook} />
			<div className={this.state.createNotebookState + "overlay--create-notebook form-style"} onClick={e => (e.stopPropagation())}>
				<form>
					<div className="form--text notebooks--name"><input name="name" type="text" placeholder="Notebook Name" onChange={this.handleChange} ref={(input) => {this.notebookNameInput = input}}/></div>
					<Button wrapperClass="notebooks--create" type="submit" title="Create Notebook" onClick={this.register}/>
				</form>
			</div>
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
        setTimeout(function() {
            this.setState({ notebookState: "stateLoad stateTransition " });

            setTimeout(function() {
                if(this.state.notebookState === "stateLoad stateTransition ")
                    this.setState({ notebookState: "" });

            }.bind(this), 300);

        }.bind(this), 300);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.props.visible) {
            this.setState({ notebookState: "stateExit stateTransition " });
        }
    }

    render() {
        return (<a className={this.state.notebookState + "notebooks--notebook"} onClick={e => (e.preventDefault(), this.parent.openNotebook(this.notebook))}>
            <div className="notebook--title">{this.notebook.name}</div>
            <div className="notebook--scribbles" />
        </a>);
	}
}
