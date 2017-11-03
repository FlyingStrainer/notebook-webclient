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
		return <div className="forms" id="">
				<div className="forms header" id="">
					<h1 className="forms header" id="">Sign Entry</h1>
					<input className="forms header" id="" type="button" value="Cancel" onClick={this.cancelCallback}/>
				</div>
				<SignEntryFields submitCallback={this.submitCallback} author={this.author}/>
			</div>;
	}
}

class CosignEntryFields extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.submitCallback=props.submitCallback;
	}
	
	render() {
		return <div id="">
				<form id="">
					<input className="forms" id="" /><br /><br />

					<input className="forms" id="" type="button" value="Submit" onClick={this.postNewNotebook} /><br /><br />
				</form>
			</div>;	
	}
}
