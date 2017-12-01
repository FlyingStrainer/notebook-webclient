import React from "../../../lib/react.js";
import TagsInput from "../../../lib/react-tagsinput.js";

import Button from "./button.js";

import * as Form from "./form.js";
import * as Utils from "../../utils.js";

export default class DataEntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { overlayState : "stateLoad ", tags : [], tag : "" };

		this.user_hash = props.user_hash;
        this.notebook_hash = props.notebook_hash;
		this.submitCallback = props.submitCallback;

		this.showNewEntry = this.showNewEntry.bind(this);
		this.hideNewEntry = this.hideNewEntry.bind(this);
		this.register = this.register.bind(this);
	}

    showNewEntry() {
	    this.setState({ overlayState : "stateShow " });
    }

	hideNewEntry() {
	    this.textInput.value = "";

        this.setState({ tags : [], tag : "", overlayState : "stateHide " });
	}

	register() {
		if(Form.InputEnum.TEXT(this.textInput.value)) {
		    const tags = this.state.tags;

		    if(this.state.tag.length > 0)
		        tags.push(this.state.tag);

			Utils.post("addEntry", { user_hash : this.user_hash, notebook_hash : this.notebook_hash, entry : {
				text : this.textInput.value, image : "", caption : "", tags : tags
			} }, function(json) {
				this.hideNewEntry();
				this.submitCallback(json);
			}.bind(this));
		}
    }

	render() {
		return (<div className="create-entry-form">
                <div className={this.state.overlayState + "overlay"} onClick={this.hideNewEntry} />
                <div className={this.state.overlayState + "overlay--form overlay--new-entry form-style"} onClick={e => (e.stopPropagation())}>
                    <form>
                        <div className="form--textarea">
                            <textarea placeholder="Write Entry Here..." ref={(input) => ( this.textInput = input )}/>
                        </div>
                        <TagsInput name="Tags" value={this.state.tags} inputValue={this.state.tag} onChangeInput={e => (this.setState({ tag : e }))} onChange={e => (this.setState({ tags : e }))} />
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