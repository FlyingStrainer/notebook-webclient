import React from "../../../lib/react.js";

import Button from "./button.js";
import * as Form from "./form.js";
import * as Utils from "../../utils.js";

export default class FeedbackForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = { overlayState : "stateLoad " };

		this.showFeedback = this.showFeedback.bind(this);
		this.hideFeedback = this.hideFeedback.bind(this);
		this.sendFeedback = this.sendFeedback.bind(this);
	}

	showFeedback() {
		this.setState({ overlayState : "stateShow " });
	}

	hideFeedback() {
		this.textInput.value = "";
		this.setState({ overlayState : "stateHide " });
	}

	sendFeedback() {
	    if(Form.InputEnum.TEXT(this.textInput.value))
		    Utils.post("feedback", { message : this.textInput.value });
		this.hideFeedback();
	}

	render() {
		return (<div className="dev-feedback-form">
			<div className={this.state.overlayState + "overlay"} onClick={this.hideFeedback} />
			<div className={this.state.overlayState + "overlay--form overlay--feedback form-style"}>
				<form>
					<div className="form--textarea">
						<textarea placeholder="Write Feedback Here..." ref={(input) => ( this.textInput = input )}/>
					</div>
					<Button wrapperClass="form--submit" type="submit" title="Send Feedback" onClick={this.sendFeedback}/>
				</form>
			</div>
		</div>);
	}
}
