import DataEntry from "../models/dataentry.js";
import DataEntryForm from "../forms/dataentry.js";
import ReviewEntryForm from "../forms/reviewdataentry.js";

import React from "../../lib/react.js";
import ToolbarView from "./subviews/toolbar.js";
import * as Utils from "../utils.js";

export default class NotebookPagesView extends React.Component {

	constructor(props) {
		super(props);

		this.parent = props.parentHandler;

		this.notebook_permissions = this.parent.getUser().permissions.notebooks.find(function(notebook_permissions) {
			return notebook_permissions.notebook_hash === this.parent.getCurrentNotebook().notebook_hash;
		}.bind(this));

		this.state = { entriesList : [], newEntryState : "stateLoad ", deleteEntry : undefined, deleteEntryState : "stateLoad ", close : false };

		this.pageListSearch = this.pageListSearch.bind(this);

		this.toggleNewEntry = this.toggleNewEntry.bind(this);
		this.toggleDeleteEntry = this.toggleDeleteEntry.bind(this);

		this.back = this.back.bind(this);
		this.logout = this.logout.bind(this);

        this.parentToolbar = { searchHandler : this.pageListSearch, backCallback : this.back, logoutCallback : this.logout };
        this.parentEntry = { toggleDeleteEntry : this.toggleDeleteEntry };
	}

	componentDidMount() {
		Utils.post("getEntries", { user_hash : this.parent.getUser(),  notebook_hash : this.parent.getCurrentNotebook().notebook_hash }, function(json) {

			json.data_entries.forEach(function(entry_uuid) {

				Utils.post("getEntry", {
					user_hash : this.parent.getUser(),
					notebook_hash : this.parent.getCurrentNotebook().notebook_hash,
					entry_hash : entry_uuid
				}, function(json) {

					this.setState({ entriesList : this.state.entriesList.concat(new DataEntry(entry_uuid, json)) });

				}.bind(this));

			}.bind(this));

		}.bind(this));
    }

	pageListSearch(event) {

    }

    toggleNewEntry(entry) {
		if(entry !== undefined && entry.text !== undefined)
		{
			this.setState({ entriesList : this.state.entriesList.concat(entry) });
		}

		this.setState({ newEntryState : Utils.showHide(this.state.newEntryState) });
    }

    toggleDeleteEntry(entry, mode) {
		this.setState({ deleteEntry : entry, deleteEntryState : Utils.showHide(this.state.deleteEntryState) });
    }

    back(event) {
	    this.setState({ entriesList : this.state.entriesList.slice(), close : true });

	    setTimeout(function(){
		    this.parent.back(event);
	    }.bind(this), 300);
    }

	logout(event) {
	    this.setState({ entriesList : this.state.entriesList.slice(), close : true });

        setTimeout(function(){
            this.parent.logout(event);
        }.bind(this), 300);
    }

	render() {
		return <div className="pages">
			<ToolbarView page={this.parent.getUser().company_name + " < " + this.parent.getCurrentNotebook().name} parentHandler={this.parentToolbar} visibile={this.state.close} hasBack={true} />
			<div className="list-view">
				{this.notebook_permissions.write ?
				<div className="notebooks--notebook notebooks--create-notebook" onClick={this.toggleNewEntry}>
					<div className="notebook--create-icon" />
				</div> : null}
				<div className="pages--entry-list">
					{this.state.entriesList.map(entry => (
						<PageView parentHandler={this.parentEntry} entry={entry} visible={this.state.close}/>
					))}
				</div>
			</div>
            <div className={this.state.newEntryState + "overlay"} onClick={this.toggleNewEntry} />
			<div className={this.state.newEntryState + "overlay--new-entry form-style"} onClick={e => (e.stopPropagation())}>
				<DataEntryForm submitCallback={this.toggleNewEntry} />
			</div>
            <div className={this.state.deleteEntryState + "overlay"} onClick={this.toggleDeleteEntry} />
			<div className={this.state.deleteEntryState + "overlay--review-entry form-style"} onClick={e => {e.stopPropagation()}}>
				<ReviewEntryForm entry={this.state.deleteEntry} user={this.parent.getUser()} permissions={this.notebook_permissions}
				                 deleteCallback={this.toggleDeleteEntry} cosignCallback={this.toggleDeleteEntry} />
			</div>
		</div>
	}
}

class PageView extends React.Component {
	constructor(props) {
		super(props);

		this.parent = props.parentHandler;
		this.entry = props.entry;

		this.state = { entryState : "stateLoad " };
	}

	componentDidMount() {
		setTimeout(function() {
			this.setState({ entryState: "stateLoad stateTransition " });

			setTimeout(function() {
				if(this.state.entryState === "stateLoad stateTransition ")
					this.setState({entryState: ""});

			}.bind(this), 300);
		}.bind(this), 300);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.visible !== this.props.visible)
			this.setState({notebookState: "stateExit stateTransition "});
	}

	render() {
		return (<a className={this.state.entryState + "entries--entry"} onClick={e => (e.preventDefault(), this.parent.toggleDeleteEntry(this.entry))}>
			<div className="entry--title">{this.entry.author}</div>
            <div className="entry--date">{this.entry.getDate()}</div>
			<div className="notebook--scribbles" />
		</a>);
	}
}