import React from "../../lib/react.js";

import NotebookModel from "../models/notebook.js";
import DataEntryModel from '../models/dataentry.js';
export * from "./form.js";
import SignEntryFields from "./sign.js";
import * as Utils from "../utils.js";

export default class CosignEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.author = props.author;
		this.cancelCallback = props.cancelCallback;
		this.submitCallback = props.submitCallback;
		this.cosign = this.cosign.bind(this);
		this.notebook = props.notebook;
		this.entry = props.entry;
		//Testing
		this.entry = new DataEntryModel();
		this.notebook = new NotebookModel();
		this.entry.user_hash = "Hi";
		this.notebook.notebook_hash = "Ho";
		this.entry.entry_hash = "Hu";
	}

	cosign() {
		Utils.post("cosignEntry", {
			user_hash: this.entry["user_hash"],
			notebook_hash: this.notebook["notebook_hash"],
			entry_hash: this.entry["entry_hash"]
		})

		if (this.submitCallback)
			this.submitCallback();
	}

	//<input className="forms header" id="cancel-button" type="button" value="Cancel" onClick={this.cancelCallback}/>
	render() {
		return 	<div>
				<SignEntryFields submitCallback={this.cosign} author={this.author}/>
			</div>;
	}
}
