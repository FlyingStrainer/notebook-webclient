import React from "../../../lib/react.js";

import DataEntryModel from '../../models/dataentry.js';
import TagsInput from "../../../lib/react-tagsinput.js";
import Button from "../subviews/button";

export default class DataEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { overlayState : "stateLoad ", tags : []};

		this.user_hash = props.user_hash;
        this.notebook_hash = props.notebook_hash;
		this.submitCallback = props.submitCallback;

		this.hideNewEntry = this.hideNewEntry.bind(this);
		this.register = this.register.bind(this);
	}

    showNewEntry() {
	    this.setState({ overlayState : "stateShow "});
    }

	hideNewEntry() {
	    this.textInput.value = "";
	    this.setState({ tags : [] });

        this.setState({ overlayState : "stateHide " });
	}

	register() {

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
		return (<div className="create-entry-form">
                <div className={this.state.overlayState + "overlay"} onClick={this.hideNewEntry} />
                <div className={this.state.overlayState + "overlay--new-entry form-style"} onClick={e => (e.stopPropagation())}>
                    <form>
                        <div className="form--textarea">
                            <textarea placeholder="Write Entry Here..." ref={(input) => ( this.textInput = input )}/>
                        </div>
                        <TagsInput name="Tags" value={this.state.tags} onChange={e => (this.setState({ tags : e }))} />
                        <Button wrapperClass="form--submit" type="submit" title="Create Entry" onClick={this.register}/>
                    </form>
                </div>
            </div>);
	}
}

export class ImageInput extends React.Component {
	constructor(props) {
		super(props);
		this.imageHandler = props.imageHandler;
		this.state = {imgSrc: []};
		this.fileSelected = this.fileSelected.bind(this);
	}

	// Select file from image selector
	fileSelected(input) {
		console.log("File Selected:");
		console.log(input.target.value);
		if (input.target.value) {
			var reader = new FileReader();
			reader.onloadend = function (e) {
				this.imageHandler(reader.result);
				this.setState({
					imgSrc: [reader.result]
				})
			}.bind(this);
		}
	}
	
	render() {
		return <div>
			<input type="file" title="Choose an Image:" className="forms imageInput" id="image-upload" accept="image/*" onChange={(event)=>{this.fileSelected(event)}} />
			<div className="forms" id="imageContainer">
				<img className="forms imageInput" id="image" src={this.state.imgSrc} />
			</div>
		</div>
	}
}