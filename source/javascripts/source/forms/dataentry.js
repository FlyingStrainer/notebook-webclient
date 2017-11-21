import * as form from "./form.js";
import DataEntryModel from '../models/dataentry.js';
import TagsInput from "../../lib/react-tagsinput.js";

export default class DataEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {hasImage: false, file: [], imgSrc: null, tags : []};
		this.dataEntry = new DataEntryModel("", "", "", "", "");
		this.submitPage = this.submitPage.bind(this);
		this.submitCallback = props.submitCallback;
		this.author=props.author;
		this.notebook_hash = props.notebook_hash;

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

		var body = JSON.stringify({
			user_hash: this.author,
			notebook_hash: this.notebook_hash,
			entry: this.dataEntry	
		});

		console.log(this.dataEntry);
		fetch('http://endor-vm1.cs.purdue.edu/addEntry', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'appication/json'
			},
			body: body
		}).then( function(response) {
			if (response.ok) {
				console.log(response.json());
			}	
		});

		if (this.submitCallback) {
			this.submitCallback(this.dataEntry);
		}

		// Clear form for future use
		this.dataEntry = new DataEntryModel("", "", "", "", "");
	}

	render() {
		return <form>
					<TextAreaInput label="Describe your work:" textHandler={this.textChanged} />

					<ImageInput imageHandler={this.imageChanged} />

					<TextInput label="Caption the image" textHandler={this.captionChanged} />
					<TagsInput name="Tags" value={this.state.tags} onChange={e => (this.setState({tags : e}))} />
					<SubmitButton message="By checking this you confirm the accuracy of this entry." label="Submit" submissionHandler={this.submitPage}/>
				</form>;
	}
}


export class TextAreaInput extends React.Component {
	constructor(props) {
		super(props);
		this.label = props.label
		this.textHandler = props.textHandler;
	}
	
	render() {
		return <div class="form--textarea">
			<textarea placeholder={this.label} onChange={this.textHandler} />
		</div>
	}
}

export class TextInput extends React.Component {
	constructor(props) {
		super(props);
		this.label = props.label
		this.textHandler = props.textHandler;
	}

	render() {
		return <div class="form--textarea">
			<input type="text" placeholder={this.label} onChange={this.textHandler} />
		</div>
	}
}

export class ImageInput extends React.Component {
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
			<input type="file" ref="file" title="Choose an Image:" className="forms imageInput" id="image-upload" accept="image/*" onChange={(event)=>{this.fileSelected(event)}} />
			<div className="forms" id="imageContainer">
				<img className="forms imageInput" id="image" src={this.state.imgSrc} />
			</div>
		</div>
	}
}

export class SubmitButton extends React.Component {
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
				<input className="forms submitButton" id="checkbox" type="checkbox"/>
				{this.message}
			</label>
			<input className="forms submitButton" type="button" value={this.label} onClick={this.submit} />
		</div>
	}
}
