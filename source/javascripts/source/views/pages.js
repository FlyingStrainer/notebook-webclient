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

		this.notebook_permissions = this.parent.getUser().permissions.notebooks[this.parent.getCurrentNotebook().notebook_hash];

		this.state = { entriesList : [], pageState : "stateLoad ", close : false, query : true };
		this.entryList = [];

		this.register = this.register.bind(this);
		this.redact = this.redact.bind(this);
		this.cosign = this.cosign.bind(this);

		this.reviewEntry = this.reviewEntry.bind(this);

		this.pageSearch = this.pageSearch.bind(this);
		this.manager = this.manager.bind(this);
		this.back = this.back.bind(this);
		this.logout = this.logout.bind(this);

        this.parentToolbar = { backCallback : this.back, logoutCallback : this.logout, user_hash : this.parent.getUser().user_hash,
            notebook_hash : this.parent.getCurrentNotebook().notebook_hash, query : this.pageSearch, manager : this.manager};
        this.parentEntry = { reviewEntry : this.reviewEntry };
	}

	componentDidMount() {

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

                    this.entryList.push(new DataEntry(entry_uuid, json));

                    this.entryList.sort(function(d1, d2) {
                        return d2.date_created_real - d1.date_created_real;
                    });

					this.setState({ entriesList : this.entryList.slice() });

				}.bind(this), function(error) {
					console.log(error);
				});

			}.bind(this));

		}.bind(this));
    }

    register(responseJson) {

	    this.entryList.push(new DataEntry(responseJson.entry_hash, responseJson));

        this.entryList.sort(function(d1, d2) {
            return d2.date_created_real - d1.date_created_real;
        });

	    this.setState({ entriesList : this.entryList.slice() });
	    this.parent.getCurrentNotebook().calcDateModified(responseJson.date_modified);
    }

    redact() {

    }

    cosign() {

    }

    reviewEntry(entry) {
	    this.review_entry.setReviewEntry(entry);
    }

    pageSearch(mode, text, date1, date2, tags, tag) {
		if(mode === "stateText ") {
			Utils.post("searchByText", { user_hash : this.parent.getUser().user_hash, notebook_hash : this.parent.getCurrentNotebook().notebook_hash, text : text }, function(json) {

				this.setState({ entriesList : [] });

				json.results[0].entries.forEach(function(entry) {

					const foundNotebook = this.entryList.find(function(n) {
						return n.entry_hash === entry;
					});

					this.setState({ entriesList : this.state.entriesList.concat(foundNotebook) });

				}.bind(this));
			}.bind(this));
		}
    }

    manager() {
	    this.create_entry.hideNewEntry();
	    this.review_entry.hideReviewEntry();
	    this.setState({ pageState : "stateExit stateTransition ", query : false });

	    setTimeout(function() {
            this.parent.manager();
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
			<ToolbarView dataIntro="Click the man in the suit to change uiSettings. Click the button with 3 circles to share current notebook. Click the magnifying glass to search. Click the button to far right to logout"
			             dataStep="1" page={this.parent.getUser().company_name + " < " + this.parent.getCurrentNotebook().name}
			             parentHandler={this.parentToolbar} visible={this.state.close} hasShare={true} hasBack={true} query={this.state.query} isManager={this.notebook_permissions.manager} />
			<div data-intro="Click on the plus button to create a new data entry. Click on any existing page to it's right and be brought to a window where clicking the top button cosigns or clicking bottom button delete/archive" data-step="2" className={this.state.pageState + "list-view"}>
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
