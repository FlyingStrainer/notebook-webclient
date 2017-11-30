import React from "../../../lib/react.js";

import Button from "./button.js";
import Entry from "../subviews/entry.js";
import * as Utils from "../../utils.js";

export default class CosignEntryForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = { overlayState : "stateLoad ", entry : undefined };

		this.user_hash = props.user_hash;
		this.notebook_hash = props.notebook_hash;
		this.entry = props.entry;
		this.submitCallback = props.submitCallback;

		this.setCosignEntry = this.setCosignEntry.bind(this);
		this.hideCosign = this.hideCosign.bind(this);
		this.showCosign = this.showCosign.bind(this);
		this.cosign = this.cosign.bind(this);
	}

	setCosignEntry(entry) {
		this.setState({ entry : entry });
	}

	hideCosign() {
		this.setState({ overlayState : "stateHide ", entry : undefined });
	}

	showCosign() {
		this.setState({ overlayState : "stateShow " });
	}

	cosign() {
		Utils.post("cosignEntry", {
			user_hash: this.user_hash,
			notebook_hash: this.notebook_hash,
			entry_hash: this.entry.entry_hash
		}, function(json) {
			this.hideCosign();
			this.submitCallback(json);
		}.bind(this))
	}

	render() {
		return 	(<div className="cosign-entry-form">
			<div className={this.state.overlayState + "overlay"} onClick={this.hideCosign} />
			<div className={this.state.overlayState + "overlay--cosign-entry form-style"}>
				{this.state.entry ? <Entry entry={this.entry} /> : null}
				<form>
					{this.state.entry ? <div>
						<div className="form--half"><Button wrapperClass="cosign" type="submit" title="Cosign" onClick={this.cosign} /></div>
					</div> : null}
				</form>
			</div>
		</div>);
	}
}
