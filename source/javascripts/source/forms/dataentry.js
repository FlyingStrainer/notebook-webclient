import * as form from "./form.js";
//import React from "./../../lib/react.js"; 
//import ReactDOM from "./../../lib/react-dom.js";
export * from "./form.js";
var rootObject;

class DataEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <DataEntryFields />; 
	}
}

class DataEntryFields extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (<form className="data-form" id="form">
			Describe your work:<br />
			<textarea className="data-form" id="text-box"></textarea><br /><br />
			Include an image:<br />
			<input type="file" className="data-form" id="image-upload"/><br /><br />
			Caption the image:<br />
			<textarea className="data-form" id="caption-box"></textarea><br /><br />
		
			<input className="data-form" id="submit-button" type="submit" /><br /><br />
		</form>);	
	}
}

module.exports = DataEntryForm;
