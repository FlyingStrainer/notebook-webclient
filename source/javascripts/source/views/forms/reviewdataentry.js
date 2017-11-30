import React from "../../../lib/react.js";

import Button from "../subviews/button";
import * as Utils from "../../utils.js";

export default class ReviewEntryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { overlayState : "stateLoad ", entry : undefined };

        this.user_hash = props.user_hash;
        this.notebook_hash = props.notebook_hash;
        this.notebook_permissions = props.notebook_permissions;

        this.deleteCallback = props.deleteCallback;
        this.cosignCallback = props.cosignCallback;

        this.hideReviewEntry = this.hideReviewEntry.bind(this);
        this.redact = this.redact.bind(this);
        this.cosign = this.cosign.bind(this);
    }

    setReviewEntry(reviewEntry) {
        this.setState({ entry : reviewEntry });
    }

    showReviewEntry() {
        this.setState({ overlayState : "stateShow "});
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
            <div className={this.state.overlayState + "overlay--review-entry form-style"}>
                <form>
                    {!this.state.entry ? null :
                        <div>
                            <div className="data-entry--background">
                                <h3 className="data-entry--author">{this.state.entry.author}</h3>
                                <h4 className="data-entry--date">{this.state.entry.date_created}</h4>
                                <p>{this.state.entry.text}</p>
                                <img className="data-entry--image" src={this.state.entry.image} />
                                <p className="data-entry--caption">{this.state.entry.caption}</p>
                            </div>
                            {this.notebook_permissions.manager ? <div className="form--half"><Button wrapperClass="cosign" type="submit" title="Cosign" onClick={this.cosign} /></div> : null}
                            {this.notebook_permissions.write && this.user_hash === this.state.entry.author ?
                                <div className="form--half"><Button wrapperClass="delete" type="submit" title="Delete" onClick={this.redact} /></div> : null}
                        </div>}
                </form>
            </div>
        </div>);
    }
}