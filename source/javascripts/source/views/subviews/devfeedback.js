import React from "../../../lib/react.js";
import * as Utils from "../../utils.js";

export default class DevFeedbackView extends React.Component {

    constructor(props) {
        super(props);

        this.parent = props.parentHandler;

        this.state = { stateFeedback : "stateLoad ", stateNotification : "stateLoad " };

        this.postFeedback = this.postFeedback.bind(this);
        this.toggleFeedback = this.toggleFeedback.bind(this);
    }

    componentDidMount() {
        setTimeout(function() {
            this.setState({ stateNotification: "stateShow " });
        }.bind(this), 300);
    }

    postFeedback() {
        this.toggleFeedback();
    }

    toggleFeedback() {
        this.setState({ stateFeedback : Utils.showHide(this.state.stateFeedback) });
    }

    render() {
        return (<div className="feedback">
            <div className={this.state.stateNotification + "feedback--box form-style"}>
                <form>
                    <div className="form--label"><img src="./images/feedback.png" alt="Feedback" width="64" onClick={this.toggleFeedback} /></div>
                </form>
            </div>
            <div className={this.state.stateFeedback + "overlay"} onClick={this.toggleFeedback}>
                <div className="overlay--feedback-entry form-style" onClick={e => (e.stopPropagation())}>

                </div>
            </div>
        </div>)
    }

}