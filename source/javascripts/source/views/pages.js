import DataEntry from "../models/dataentry.js";
import CreateEntryForm from "./forms/createdataentry.js";
import ReviewEntryForm from "./forms/reviewdataentry.js";

import React from "../../lib/react.js";
import ToolbarView from "./subviews/toolbar.js";
import * as Utils from "../utils.js";

export default class NotebookPagesView extends React.Component {

	constructor(props) {
		super(props);

		this.parent = props.parentHandler;

		this.notebook_permissions = this.parent.getUser().permissions.notebooks[this.parent.getCurrentNotebook().notebook_hash];

		this.state = { entriesList : [], pageState : "stateLoad ", close : false };

		this.pageListSearch = this.pageListSearch.bind(this);

		this.register = this.register.bind(this);
		this.redact = this.redact.bind(this);
		this.cosign = this.cosign.bind(this);

		this.reviewEntry = this.reviewEntry.bind(this);

		this.back = this.back.bind(this);
		this.logout = this.logout.bind(this);

        this.parentToolbar = { searchHandler : this.pageListSearch, backCallback : this.back, logoutCallback : this.logout, notebook_hash : this.parent.getCurrentNotebook().notebook_hash };
        this.parentEntry = { reviewEntry : this.reviewEntry };
	}

	componentDidMount() {
	    const entryList = [];

        setTimeout(function() {
            this.setState({ pageState : "stateLoad stateTransition " });

            setTimeout(function() {
                if(this.state.pageState === "stateLoad stateTransition ")
                    this.setState({ pageState : "" });

            }.bind(this), 300);
        }.bind(this), 300);

		Utils.post("getEntries", { user_hash : this.parent.getUser(),  notebook_hash : this.parent.getCurrentNotebook().notebook_hash }, function(json) {

			json.data_entries.forEach(function(entry_uuid) {

				Utils.post("getEntry", {
					user_hash : this.parent.getUser(),
					notebook_hash : this.parent.getCurrentNotebook().notebook_hash,
					entry_hash : entry_uuid
				}, function(json) {

                    entryList.push(new DataEntry(entry_uuid, json));

					this.setState({ entriesList : entryList.slice() });

				}.bind(this));

			}.bind(this));

		}.bind(this));
    }

	pageListSearch(event) {

    }

    register() {

    }

    redact() {

    }

    cosign() {

    }

    reviewEntry(entry) {
	    this.review_entry.setReviewEntry(entry);
	    this.review_entry.showReviewEntry();
    }

    back(event) {
	    this.create_entry.hideNewEntry();
        this.review_entry.hideReviewEntry();
	    this.setState({ pageState : "stateExit stateTransition ", close : true });

	    setTimeout(function(){
		    this.parent.back(event);
	    }.bind(this), 300);
    }

	logout(event) {
        this.create_entry.hideNewEntry();
        this.review_entry.hideReviewEntry();
	    this.setState({ pageState : "stateExit stateTransition ", close : true });

        setTimeout(function(){
            this.parent.logout(event);
        }.bind(this), 300);
    }

	render() {
		return <div className="pages">
			<ToolbarView dataIntro="Click the gear to change render settings. Click the magnifying glass to search. Click the button with 3 circles to share current notebook. Click the button to far right to logout" dataStep="1" page={this.parent.getUser().company_name + " < " + this.parent.getCurrentNotebook().name} parentHandler={this.parentToolbar} visible={this.state.close} hasRenderSetting={true} hasShare={true} hasBack={true} />
			<div className={this.state.pageState + "list-view"}>
				{this.notebook_permissions.write ?
				<div className="entries--entry create" onClick={() => {
				    if(this.notebook_permissions.write)
				        this.create_entry.showNewEntry();
				}}>
					<div className="create-icon" />
				</div> : null}
				<div className="pages--entry-list">
					{this.state.entriesList.map(entry => (
						<PageView parentHandler={this.parentEntry} entry={entry} visible={this.state.close} key={entry.entry_hash} />
					))}
				</div>
			</div>

            <CreateEntryForm create={this.notebook_permissions.write}
                             user_hash={this.parent.getUser().user_hash} notebook_hash={this.parent.getCurrentNotebook().notebook_hash}
                             submitCallback={this.register} ref={form => (this.create_entry = form)}/>

            <ReviewEntryForm user_hash={this.parent.getUser().user_hash} notebook_hash={this.parent.getCurrentNotebook().notebook_hash}
                             notebook_permissions={this.notebook_permissions} deleteCallback={this.redact} cosignCallback={this.cosign}
                             ref={form => (this.review_entry = form)}/>
      <a className="intro-btn" href="#" onClick={e => (e.preventDefault(), introJs().start())} />
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
	    this.mounted = true;
		setTimeout(function() {
		    if(this.mounted) {
                this.setState({ entryState: "stateLoad stateTransition " });

                setTimeout(function() {
                    if(this.mounted && this.state.entryState === "stateLoad stateTransition ")
                        this.setState({ entryState: "" });

                }.bind(this), 300);
            }
		}.bind(this), 300);
	}

	componentWillUnmount() {
	    this.mounted = false;
    }

	render() {
		return (<a className={this.state.entryState + "entries--entry"} onClick={e => (e.preventDefault(), this.parent.reviewEntry(this.entry))}>
			<div className="entry--title">{this.entry.author}</div>
            <div className="entry--date">{this.entry.date_created}</div>
			<div className="notebook--scribbles" />
		</a>);
	}
}
