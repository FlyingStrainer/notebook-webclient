import React from "../../../lib/react.js";
import Button from "./button.js";

export default class DevFeedbackView extends React.Component {

    constructor(props) {
        super(props);

        this.parent = props.parentHandler;

        this.state = {stateFeedback : "stateLoad ", stateNotification : "stateLoad "};

        this.postFeedback = this.postFeedback.bind(this);
        this.toggleFeedback = this.toggleFeedback.bind(this);
    }

    postFeedback() {
        this.toggleFeedback();
    }

    toggleFeedback() {

    }

    render() {
        return (<div className="feedback">
            <div className={this.state.stateNotification + "feedback--notification--box form-style"}>
                <form>
                    <Button wrapperClass="feedback--button" type="submit" title="Feedback Entry" onClick={this.toggleFeedback} />
                </form>
            </div>
            <div className={this.state.stateFeedback + "overlay"} onClick={this.toggleFeedback}>
                <div className="overlay--feedback-entry form-style" onClick={e => (e.stopPropagation())}>

                </div>
            </div>
        </div>)
    }

}