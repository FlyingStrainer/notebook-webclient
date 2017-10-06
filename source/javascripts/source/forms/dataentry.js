import * as form from "./form.js";
//import React from "./../../lib/react.js"; 
//import ReactDOM from "./../../lib/react-dom.js";
const DataEntry = require('../models/dataentry.js');
export * from "./form.js";
var rootObject;

class DataEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.dataEntry = new DataEntry("", "", "", "", props.author);
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
				this.dataEntry.image = reader.result;
				this.setState({
					imgSrc: [reader.result]
				})
			}.bind(this);
			var url = reader.readAsDataURL(file);
		}
	}

	submitPage() {
		console.log("Hai");
		var checkbox = document.getElementById("checkbox");
		if (!checkbox.checked)
		{
			console.log("Whoa");
			return;
		}

		this.dataEntry.text = document.getElementById("text-box").value;
		this.dataEntry.caption = document.getElementById("caption-box").value;
		this.dataEntry.data_created = new Date();
		this.dataEntry.tags = document.getElementById("tag-box").value;
		//Need to set author

		fetch('', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'appication/json'
			},
			body: JSON.stringify({
				param1: 'value1',
				param2: 'value2'
			})
		});
	}

	render() {
		return (<div className="data-form" id="form-div">
				<form className="data-form" id="form">
					Describe your work:<br />
					<textarea className="data-form" id="text-box"></textarea><br /><br />
					Include an image:<br />
					<input type="file" ref="file" className="data-form" id="image-upload" accept="image/*" onChange={(event)=>{this.fileSelected(event)}} /><br />
					<img className="data-form" id="image" src={this.state.imgSrc} /><br />
					Caption the image:<br />
					<textarea className="data-form" id="caption-box"></textarea><br /><br />

					Add image tags:<br />
					(Write tags as a comma separated list, for example: "Wheels, Drive Train, Movement")<br />
					<textarea className="data-form" id="tag-box"></textarea><br /><br />
					<label>	
						<input className="data-form" id="checkbox" type="checkbox" value="Hi"/>
						By checking this you confirm the accuracy of this entry.<br /><br />
					</label>
					<input className="data-form" id="submit-button" type="button" value="Submit" onClick={this.submitPage} /><br /><br />
				</form>
			</div>);	
	}
}

module.exports = DataEntryForm;
