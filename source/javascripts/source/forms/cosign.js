import * as form from "./form.js";
import NotebookModel from "../models/notebook.js";
export * from "./form.js";
import { SignEntryFields } from "./sign.js";

export class CosignEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.cancelCallback = props.cancelCallback;
		this.submitCallback = props.submitCallback;
	}

	render() {
		return <div>
				<div className="forms header" id="container">
					<h1 className="forms header" id="header-text">Sign Entry</h1>
					<input className="forms header" id="cancel-button" type="button" value="Cancel" onClick={this.cancelCallback}/>
				</div>
				<br />
				<br />
				<SignEntryFields submitCallback={this.submitCallback} author={this.author}/>
			</div>;
	}
}
