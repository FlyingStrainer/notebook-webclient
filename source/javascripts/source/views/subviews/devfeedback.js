import React from "../../../lib/react.js";
import * as Utils from "../../utils.js";
import FeedbackForm from "../forms/feedback"

export default class DevFeedbackView extends React.Component {

    constructor(props) {
        super(props);

        this.parent = props.parentHandler;

        this.state = { stateFeedback : "stateLoad ", stateNotification : "stateLoad " };
    }

    componentDidMount() {
        setTimeout(function() {
            this.setState({ stateNotification: "stateShow " });
        }.bind(this), 300);
    }

    render() {
        return (<div className="feedback">
            <div className={this.state.stateNotification + "feedback--box form-style"}>
                <form>
                    <div className="form--label"><img src="./images/feedback.png" alt="Feedback" width="64" onClick={() => {
                        this.feedback.showFeedback();
                    }} /></div>
                </form>
            </div>
            <FeedbackForm user_hash={this.parent.getUser().user_hash} ref={form => {this.feedback = form}} />
        </div>)
    }

}