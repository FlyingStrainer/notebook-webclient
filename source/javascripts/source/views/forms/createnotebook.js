import React from "../../../lib/react.js";

import Button from "../subviews/button.js";

export default class CreateNotebookForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = { overlayState : "stateLoad " };

		this.user_hash = props.user_hash;
		this.submitCallback = props.submitCallback;

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
	    this.hideCreateNotebook();
        this.submitCallback();
    }

	render() {
		return <div className="create-notebook-form">
            <div className={this.state.overlayState + "overlay"} onClick={this.hideCreateNotebook} />
            <div className={this.state.overlayState + "overlay--create-notebook form-style"}>
                <form>
                    <div className="form--text notebooks--name">
                        <input name="name" type="text" placeholder="Notebook Name" ref={(input) => {this.notebookNameInput = input}}/>
                    </div>
                    <Button wrapperClass="form--submit" type="submit" title="Create Notebook" onClick={this.register}/>
                </form>
            </div>
            </div>
	}
}