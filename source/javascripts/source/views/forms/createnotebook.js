import React from "../../../lib/react.js";

import Button from "./button.js";
import * as Form from "./form.js";
import * as Utils from "../../utils.js";

export default class CreateNotebookForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = { overlayState : "stateLoad " };

		this.user_hash = props.user_hash;
		this.submitCallback = props.submitCallback;

		this.showCreateNotebook = this.showCreateNotebook.bind(this);
		this.hideCreateNotebook = this.hideCreateNotebook.bind(this);
		this.register = this.register.bind(this);
	}

    showCreateNotebook() {
        this.setState({ overlayState : "stateShow " });
    }

    hideCreateNotebook() {
	    this.notebookNameInput.value = "";
        this.setState({ overlayState : "stateHide " });
    }

	register() {
		if(Form.InputEnum.TEXT(this.notebookNameInput.value)) {
			Utils.post("addNotebook", {user_hash : this.user_hash, name : this.notebookNameInput.value}, function(json) {
					this.hideCreateNotebook();
					this.submitCallback(json);
			}.bind(this));
		}
    }

	render() {
		return (<div className="create-notebook-form">
			<div className={this.state.overlayState + "overlay"} onClick={this.hideCreateNotebook} />
			<div className={this.state.overlayState + "overlay--form overlay--create-notebook form-style"}>
				<form>
					<div className="form--text notebooks--name">
						<input name="name" type="text" placeholder="Notebook Name" ref={(input) => {this.notebookNameInput = input}}/>
					</div>
					<Button wrapperClass="form--submit" type="submit" title="Create Notebook" onClick={this.register}/>
				</form>
			</div>
		</div>);
	}
}