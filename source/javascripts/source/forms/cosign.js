import * as form from "./form.js";
import NotebookModel from "../models/notebook.js";
export * from "./form.js";
import { SignEntryFields } from "./sign.js";

export default class CosignEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.cancelCallback = props.cancelCallback;
		this.submitCallback = props.submitCallback;
	}

	render() {
		return <div className="" id="">
				<div className="" id="">
					<h1 className="" id="">Sign Entry</h1>
					<input className="" id="" type="button" value="Cancel" onClick={this.cancelCallback}/>
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
		return <div className="" id="">
				<form className="" id="">
					<input className="" id="" /><br /><br />

					<input className="" id="" type="button" value="Submit" onClick={this.postNewNotebook} /><br /><br />
				</form>
			</div>;	
	}
}
