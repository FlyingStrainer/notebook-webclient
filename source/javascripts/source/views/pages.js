import React from "../../lib/react.js";

import DataEntry from "../models/dataentry.js";

import ToolbarView from "./subviews/toolbar.js";
import PageView from "./subviews/page.js";

import CreateEntryForm from "./forms/createdataentry.js";
import ReviewEntryForm from "./forms/reviewdataentry.js";

import * as Utils from "../utils.js";

export default class NotebookPagesView extends React.Component {

	constructor(props) {
		super(props);

		this.parent = props.parentHandler;
		this.managerCallback = props.managerCallback;

		this.notebook_permissions = this.parent.getUser().permissions.notebooks[this.parent.getCurrentNotebook().notebook_hash];

		this.state = { entriesList : [], pageState : "stateLoad ", close : false, query : true };

		this.register = this.register.bind(this);
		this.redact = this.redact.bind(this);
		this.cosign = this.cosign.bind(this);

		this.reviewEntry = this.reviewEntry.bind(this);

		this.pageSearch = this.pageSearch.bind(this);
		this.manager = this.manager.bind(this);
		this.back = this.back.bind(this);
		this.logout = this.logout.bind(this);

		//this.managerCallback = this.managerCallback.bind(this);

        this.parentToolbar = { backCallback : this.back, logoutCallback : this.logout, user_hash : this.parent.getUser().user_hash,
            notebook_hash : this.parent.getCurrentNotebook().notebook_hash, query : this.pageSearch, manager : this.manager};
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

		Utils.post("getEntries", { user_hash : this.parent.getUser().user_hash,  notebook_hash : this.parent.getCurrentNotebook().notebook_hash }, function(json) {

			json.forEach(function(entry_uuid) {

				Utils.post("getEntry", {
					user_hash : this.parent.getUser(),
					notebook_hash : this.parent.getCurrentNotebook().notebook_hash,
					entry_hash : entry_uuid
				}, function(json) {

                    entryList.push(new DataEntry(entry_uuid, json));

                    entryList.sort(function(d1, d2) {
                        return d2.date_created_real - d1.date_created_real;
                    });

					this.setState({ entriesList : entryList.slice() });

				}.bind(this), function(error) {
					console.log(error);
				});

			}.bind(this));

		}.bind(this));
    }

    register(responseJson) {
	    const entryList = this.state.entriesList;

	    entryList.push(new DataEntry(responseJson.entry_hash, responseJson));

        entryList.sort(function(d1, d2) {
            return d2.date_created_real - d1.date_created_real;
        });

	    this.setState({ entriesList : entryList });
	    this.parent.getCurrentNotebook().calcDateModified(responseJson.date_modified);
    }

    redact() {

    }

    cosign() {

    }

    reviewEntry(entry) {
	    this.review_entry.setReviewEntry(entry);
    }

    pageSearch(responseJson) {

    }

    manager() {
	    this.create_entry.hideNewEntry();
	    this.review_entry.hideReviewEntry();
	    this.setState({ pageState : "stateExit stateTransition ", query : false });

	    this.managerCallback();
	    setTimeout(function() {
        }.bind(this), 300);
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
			<ToolbarView dataIntro="Click the gear to change render settings. Click the magnifying glass to search. Click the button with 3 circles to share current notebook. Click the button to far right to logout"
			             dataStep="1" page={this.parent.getUser().company_name + " < " + this.parent.getCurrentNotebook().name}
			             parentHandler={this.parentToolbar} visible={this.state.close} hasShare={true} hasBack={true} query={this.state.query} isManager={this.notebook_permissions.manager} />
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
