import React from "../../../lib/react.js";

import Button from "./button";
import Entry from "../subviews/entry";

import * as Utils from "../../utils.js";

export default class ReviewEntryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { overlayState : "stateLoad ", entry : undefined };

        this.user_hash = props.user_hash;
        this.notebook = props.notebook;
        this.notebook_hash = props.notebook_hash;
        this.notebook_permissions = props.notebook_permissions;

        this.deleteCallback = props.deleteCallback;
        this.cosignCallback = props.cosignCallback;

        this.setReviewEntry = this.setReviewEntry.bind(this);
        this.hideReviewEntry = this.hideReviewEntry.bind(this);
        this.showReviewEntry =  this.showReviewEntry.bind(this);
        this.redact = this.redact.bind(this);
        this.cosign = this.cosign.bind(this);
	this.renderCosignButton = this.renderCosignButton.bind(this);
    }

    setReviewEntry(reviewEntry) {
        this.setState({ entry : reviewEntry, overlayState : "stateShow " });
    }

    showReviewEntry() {
        this.setState({ overlayState : "stateShow " });
    }

	hideReviewEntry() {
        this.setState({ overlayState : "stateHide ", entry : undefined })
    }

    redact() {

    }

    cosign() {
	console.log("Cosigning");
	Utils.post(
		"cosignEntry",
		{
			user_hash: this.user_hash,
			notebook_hash: this.notebook_hash,
			entry_hash: this.state.entry.entry_hash
		},
		function(data) {
				console.log("Success");
				this.state.entry.cosign_hash = this.user_hash;
				this.setState({entry: this.state.entry});	
		}.bind(this)
	);
    }

    renderCosignButton() {
        console.log(this.state.entry.author_hash, this.user_hash);
	if (this.notebook_permissions.manager && this.state.entry.author_hash !== this.user_hash) {
			if (this.state.entry.cosign_hash === undefined) {
				return <div className="form--half"><Button wrapperClass="cosign" type="submit" title="Cosign" onClick={this.cosign} /></div>;
			}
			else {
				return <div className="form--half"><Button wrapperClass="cosigned cosign" type="submit" title="Cosigned" /> </div>
			}
	}
	else if(this.state.entry.cosign_hash){
		return <div className="form--half"><Button wrapperClass="cosigned cosign" type="submit" title="Cosigned" /> </div>;
	}
    }

    render() {
        return (<div className="review-entry-form">
            <div className={this.state.overlayState + "overlay"} onClick={this.hideReviewEntry} />
            <div className={this.state.overlayState + "overlay--form overlay--review-entry form-style"}>
                {this.state.entry ? <Entry entry={this.state.entry} notebook={this.notebook}/> : null}
                <form>
                    {this.state.entry ? <div>
			    {this.renderCosignButton()}
                    </div> : null}

                </form>
            </div>
        </div>);
    }

                    /*
                    {this.notebook_permissions.write && this.user_hash === this.state.entry.author_hash ?
                                <div className="form--half"><Button wrapperClass="delete" type="submit" title="Redact" onClick={this.redact} /></div> : null}

                     */
}
