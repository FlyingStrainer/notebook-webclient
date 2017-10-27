import * as form from "./form.js";
import DataEntryModel from '../models/dataentry.js';
export * from "./form.js";

export default class DataEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.dataEntry = new DataEntryModel("", "", "", "", "");
		this.submitCallback = props.submitCallback;
		this.cancelCallback = props.cancelCallback;
		this.author = props.author;
	}

	render() {
		return <div className="data-form" id="container">
				<div className="data-form" id="data-entry-header">
					<h1 className="data-form" id="header-text">Create new entry</h1>
					<input className="data-form" id="cancel-button" type="button" value="Cancel" onClick={this.cancelCallback}/>
				</div>
				<DataEntryFields dataEntry={this.dataEntry} submitCallback={this.submitCallback} author={this.author}/>
			</div>
	}
}

class DataEntryFields extends React.Component {
	constructor(props) {
		super(props);
		this.state = {hasImage: false, file: [], imgSrc: null};
		this.dataEntry = props.dataEntry;
		this.submitPage = this.submitPage.bind(this);
		this.submitCallback = props.submitCallback;
		this.author=props.author;

		this.textChanged = this.textChanged.bind(this);
		this.captionChanged = this.captionChanged.bind(this);
		this.dateChanged = this.dateChanged.bind(this);
		this.tagsChanged = this.tagsChanged.bind(this);
		this.authorChanged = this.authorChanged.bind(this);
		this.imageChanged = this.imageChanged.bind(this);
	}
	
	textChanged(e) {
		this.dataEntry.text = e.target.value;
	}

	captionChanged(e) {
		this.dataEntry.caption = e.target.value;
	}

	dateChanged(e) {
		this.dataEntry.date = e.target.value	
	}

	tagsChanged(e) {
		this.dataEntry.tags = e.target.value;
	}

	authorChanged(author) {
		this.dataEntry.author = author;
	}

	imageChanged(image) {
		this.dataEntry.image = image;
	}	

	// submit page to api
	submitPage() {
		console.log(this.dataEntry);
		this.dataEntry.date_created = new Date();
		//Need to set author

		console.log(this.dataEntry);
		fetch('PLACEHOLDER_URL', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'appication/json'
			},
			body: this
		});


		if (this.submitCallback) {
			this.submitCallback(this.dataEntry);
		}

		// Clear form for future use
		this.dataEntry = new DataEntryModel("", "", "", "", "");
	}

	render() {
		return (<div className="data-form" id="form-div">
				<form className="data-form" id="form">
					<TextInput label="Describe your work:" textHandler={this.textChanged} />
					< br />

					Include an image:<br />
					<ImageInput imageHandler={this.imageChanged} />

					<TextInput label="Caption the image:" textHandler={this.captionChanged} />
					<br />
					<TextInput label="Add image tags:\n(Write tags as a comma separated list, for example: 'Wheels, Drive Train, Movement')" textHandler={this.tagsChanged}/>	
					<br />
					<SubmitButton message="By checking this you confirm the accuracy of this entry." label="Submit" submissionHandler={this.submitPage}/>
				</form>
			</div>);	
	}
}


class TextInput extends React.Component {
	constructor(props) {
		super(props);
		this.label = props.label
		this.textHandler = props.textHandler;
	}
	
	render() {
		var text = this.label
		return <div>
		        {text.split("\\n").map(i => {
          			return <div>{i}</div>;
        		})}
			<textarea onChange={this.textHandler}></textarea><br />
		</div>
	}
}

class ImageInput extends React.Component {
	constructor(props) {
		super(props);
		this.imageHandler = props.imageHandler;
		this.state = {imgSrc: []}
		this.fileSelected = this.fileSelected.bind(this);
	}

	// Select file from image selector
	fileSelected(input) {
		console.log("File Selected:");
		console.log(input.target.value);
		if (input.target.value) {
			var file = this.refs.file.files[0];
			var reader = new FileReader();
			reader.onloadend = function (e) {
				console.log("Hi");
				this.imageHandler(reader.result);
				this.setState({
					imgSrc: [reader.result]
				})
			}.bind(this);
			var url = reader.readAsDataURL(file);
		}
	}
	
	render() {
		return <div>
			<input type="file" ref="file" className="data-form" id="image-upload" accept="image/*" onChange={(event)=>{this.fileSelected(event)}} /><br />
			<img className="data-form" id="image" src={this.state.imgSrc} /><br />

		</div>
	}
}

class SubmitButton extends React.Component {
	constructor(props) {
		super(props);
		this.message = props.message;
		this.label = props.label;
		this.submitPage = props.submissionHandler;
		this.submit = this.submit.bind(this);
	}
	
	submit() {
		var checkbox = document.getElementById("checkbox");
		if (!checkbox.checked)
		{
			alert("You must check the box before submitting.");
		}
		else
		{
			this.submitPage();
			checkbox.checked = false;
		}
	}
	render() {
		return <div>
			<label>	
				<input id="checkbox" type="checkbox"/>
				{this.message} <br /><br />
			</label>
			<input type="button" value={this.label} onClick={this.submit} /><br />
		</div>
	}
}
