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
		this.state = {hasImage: false, file: [], imgSrc: null};
		this.fileSelected = this.fileSelected.bind(this);
	}
	
	fileSelected(input) {
		console.log("File Selected:");
		console.log(input.target.value);
		if (input.target.value) {
			var file = this.refs.file.files[0];
			var reader = new FileReader();
			console.log("out");
			reader.onloadend = function (e) {
				console.log("in");
				this.setState({
					imgSrc: [reader.result]
				})
			}.bind(this);
			var url = reader.readAsDataURL(file);
		}
	}

	render() {
		return (<form className="data-form" id="form">
			Describe your work:<br />
			<textarea className="data-form" id="text-box"></textarea><br /><br />
			Include an image:<br />
			<input type="file" ref="file" className="data-form" id="image-upload" accept="image/*" onChange={(event)=>{this.fileSelected(event)}} /><br /><br />
			<img className="data-form" id="image" src={this.state.imgSrc} />
			Caption the image:<br />
			<textarea className="data-form" id="caption-box"></textarea><br /><br />
		
			<input className="data-form" id="submit-button" type="submit" /><br /><br />
		</form>);	
	}
}

module.exports = DataEntryForm;
