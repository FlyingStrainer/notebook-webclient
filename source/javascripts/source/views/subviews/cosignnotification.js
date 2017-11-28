import React from "../../../lib/react.js";
import Button from "./button.js";

import DataEntry from "../../models/dataentry.js";
import Cosign from "../../forms/cosign.js";

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
        fetch("http://endor-vm1.cs.purdue.edu/getEntry", {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                user_hash : this.parent.getUser(),
                notebook_hash : this.notebook_hash,
                entry_hash : this.entry_hash
            })
        }).then(function(response) {
            if(response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        }).then(function(json) {
            this.setState({stateNotification : "stateShow ", entry : new DataEntry(json.text, json.image, json.caption, json.tags, json.author)});
        }.bind(this)).catch(function(error) {
            console.log(error.message);
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

		if(this.state.stateCosign === "stateHide " || this.state.stateCosign === "stateLoad ")
		{
			this.setState({stateCosign : "stateShow "});
		}
		else
		{
			this.setState({stateCosign : "stateHide "});
		}
	}

	render() {
		return (<div className="push--notification">
			<div className={this.state.stateNotification + "push--notification--box form-style"}>
				<form>
					<Button wrapperClass="notification--cosign" type="submit" title="Cosign Data Entry" onClick={this.toggleCosign}/>
				</form>
			</div>
			<div className={this.state.stateCosign + "overlay"} onClick={this.toggleCosign}>
				<div className="overlay--cosign-entry form-style" onClick={e => (e.stopPropagation())}>
					{this.state.entry === false ? null : <Cosign submitCallback={this.toggleCosign} />}
				</div>
			</div>
		</div>);
	}
}