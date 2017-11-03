import DataEntry from "../models/dataentry.js";
import loginView from "./login.js";
import DataEntryForm from "../forms/dataentry.js";
import DeleteDataEntryForm from "../forms/deletedataentry.js";
import notebookView from "./notebooks.js";
import User from "../models/user.js";

import React from "../../lib/react.js";
import ToolbarView from "./subviews/toolbar.js";

import Entry from "./subviews/entry.js";

//let dataEntries;
//let notebook;

export default class NotebookPagesView extends React.Component {

	constructor(props) {
		super(props);

		this.parent = props.parentHandler;

		this.state = {entriesList : [], newEntryState : "stateLoad ", deleteEntry : undefined, deleteEntryState : "stateLoad ", close : false};

		this.pageListSearch = this.pageListSearch.bind(this);

		this.toggleNewEntry = this.toggleNewEntry.bind(this);
		this.toggleDeleteEntry = this.toggleDeleteEntry.bind(this);

		this.back = this.back.bind(this);
		this.logout = this.logout.bind(this);

        this.parentToolbar = {searchHandler : this.pageListSearch, backCallback : this.back, logoutCallback : this.logout};
        this.parentEntry = {toggleDeleteEntry : this.toggleDeleteEntry};
	}

	componentDidMount() {
        fetch("http://endor-vm1.cs.purdue.edu/getEntries", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
	            user_hash : this.parent.getUser(),
	            notebook_hash : this.parent.getCurrentNotebook().uuid
            })
        }).then(function(response) {
            if(response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        }).then(function(json) {
            json.data_entries.forEach(function(entry_uuid) {
                fetch("http://endor-vm1.cs.purdue.edu/getEntry", {
                    method: "POST",
                    headers: {
                        "Accept" : "application/json",
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
						user_hash : this.parent.getUser(),
                        notebook_hash : this.parent.getCurrentNotebook().uuid,
	                    entry_hash : entry_uuid
                    })
                }).then(function(response) {
                    if(response.ok) {
                        return response.json();
                    }
                    throw new Error("Network response was not ok.");
                }).then(function(json) {
                    this.setState({entriesList : this.state.entriesList.concat(new DataEntry(json.text, json.image, json.caption, json.tags, json.author))});
                }.bind(this)).catch(function(error) {
					console.log(error.message);
                }.bind(this));
            }.bind(this));

        }.bind(this)).catch(function(error) {
            console.log(error.message);
        }.bind(this));
    }

	pageListSearch(event) {

    }

    toggleNewEntry(entry) {
        if(this.state.deleteEntryState === "stateHide " || this.state.deleteEntryState === "stateLoad ")
        {
            this.setState({deleteEntry : entry, deleteEntryState : "stateShow "});
        }
        else
        {
            this.setState({deleteEntry : entry, deleteEntryState : "stateHide "});
        }
    }

	toggleDeleteEntry(entry) {
        if(this.state.newEntryState === "stateHide " || this.state.newEntryState === "stateLoad ")
        {
            this.setState({newEntryState : "stateShow "});
        }
        else
        {
            this.setState({newEntryState : "stateHide "});
        }
	}

    back(event) {
	    this.setState({entriesList : this.state.entriesList.slice(), close : true});

	    setTimeout(function(){
		    this.parent.back(event);
	    }.bind(this), 300);
    }

	logout(event) {
	    this.setState({entriesList : this.state.entriesList.slice(), close : true});

        setTimeout(function(){
            this.parent.logout(event);
        }.bind(this), 300);
    }

	render() {
		return <div className="pages">
			<ToolbarView page={this.parent.getCurrentNotebook().name} parentHandler={this.parentToolbar} visibile={this.state.close} hasBack={true} />
			<div className="list-view">
				<div className="notebooks--notebook notebooks--create-notebook" onClick={this.toggleNewEntry}>
					<div className="notebook--create-icon" />
				</div>
				<div className="pages--entry-list">
					{this.state.entriesList.map(entry => (
						<PageView parentHandler={this.parentEntry} entry={entry} visible={this.state.close}/>
					))}
				</div>
			</div>
            <div className={this.state.newEntryState + "overlay"} onClick={this.toggleNewEntry}>
                <div className="overlay--create-notebook form-style" onClick={e => (e.stopPropagation())}>
                    <DataEntryForm />
                </div>
            </div>
		</div>
	}
}

class PageView extends React.Component {
	constructor(props) {
		super(props);

		this.parent = props.parentHandler;
		this.entry = props.entry;

		console.log(this.entry.getHTMLForEntrySel());

		this.state = {entryState : "stateLoad "};
	}

	componentDidMount() {
		setTimeout(function() {
			this.setState({entryState: "stateLoad stateTransition "});
			setTimeout(function() {
				if(this.state.entryState === "stateLoad stateTransition ")
					this.setState({entryState: ""});
			}.bind(this), 300);
		}.bind(this), 300);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.visible !== this.props.visible) {
			this.setState({notebookState: "stateExit stateTransition "});
		}
	}

	render() {
		return (<a className={this.state.entryState + "entries--entry"} onClick={e => (e.preventDefault(), this.parent.toggleDeleteEntry(this.entry))}>
			<div className="entry--title">{this.entry.author}</div>
            <div className="entry--date">{this.entry.getDate()}</div>
			<div className="notebook--scribbles" />
		</a>);
	}
}