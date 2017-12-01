import React from "../../../lib/react.js";

import Button from "./button";
import Entry from "../subviews/entry"

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

    }

    render() {
        return (<div className="review-entry-form">
            <div className={this.state.overlayState + "overlay"} onClick={this.hideReviewEntry} />
            <div className={this.state.overlayState + "overlay--form overlay--review-entry form-style"}>
                {this.state.entry ? <Entry entry={this.state.entry} notebook={this.notebook}/> : null}
                <form>
                    {this.state.entry ? <div>
                            {this.notebook_permissions.manager ? <div className="form--half"><Button wrapperClass="cosign" type="submit" title="Cosign" onClick={this.cosign} /></div> : null}
                            {this.notebook_permissions.write && this.user_hash === this.state.entry.author_hash ?
                                <div className="form--half"><Button wrapperClass="delete" type="submit" title="Redact" onClick={this.redact} /></div> : null}
                    </div> : null}
                </form>
            </div>
        </div>);
    }
}