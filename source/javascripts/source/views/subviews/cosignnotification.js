import React from "../../../lib/react.js";
import Button from "../forms/button.js";

import DataEntry from "../../models/dataentry.js";
import Cosign from "../forms/cosign.js";
import * as Utils from "../../utils.js";

export default class PushNotification extends React.Component {
	constructor(props) {
		super(props);

		this.parent = props.parentHandler;

		this.notebook_hash = props.data.notebook_hash;
		this.entry_hash = props.data.entry_hash;

		this.state = {stateCosign : "stateLoad ", stateNotification : "stateLoad ", entry : false};

		console.log(this.notebook_hash);
		console.log(this.entry_hash);

		this.fetchEntry = this.fetchEntry.bind(this);

		this.toggleCosign = this.toggleCosign.bind(this);
	}

	fetchEntry() {
		Utils.post("getEntry", {
			user_hash : this.parent.getUser(),
			notebook_hash : this.notebook_hash,
			entry_hash : this.entry_hash
		}, function(json) {
			this.setState({ stateNotification : "stateShow ", entry : new DataEntry(this.entry_hash, json) });
		}.bind(this));
    }

	componentDidMount() {
	    this.fetchEntry();
	}

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.notebook_hash !== this.notebook_hash || nextProps.data.entry_hash !== this.entry_hash) {
            this.notebook_hash = nextProps.data.notebook_hash;
            this.entry_hash = nextProps.data.entry_hash;

            this.fetchEntry();
        }
    }

	toggleCosign() {
		this.setState({stateNotification : "stateHide "});

		this.setState({ stateCosign  : Utils.showHide(this.state.stateCosign) });
	}

	render() {
		return (<div className="push--notification">
			<div className={this.state.stateNotification + "push--notification--box form-style"}>
				<form>
                    <div className="form--label"><img src="./images/cosign.png" alt="Cosign" width="64" onClick={this.toggleCosign} /></div>
				</form>
			</div>
			<div className={this.state.stateCosign + "overlay"} onClick={this.toggleCosign} />
            <div className={this.state.stateCosign + "overlay--cosign-entry form-style"} onClick={e => (e.stopPropagation())}>
                {this.state.entry === false ? null : <Cosign submitCallback={this.toggleCosign} />}
            </div>
		</div>);
	}
}