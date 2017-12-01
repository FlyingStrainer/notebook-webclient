import React from "../../../lib/react.js";

import Button from "./button.js";

export default class ShareForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { overlayState : "stateLoad " };

        this.showShare = this.showShare.bind(this);
        this.hideShare = this.hideShare.bind(this);
        this.share = this.share.bind(this);
    }

    showShare() {
        this.setState({ overlayState : "stateShow " });
    }

    hideShare() {
        this.setState({ overlayState : "stateHide " });
    }

    share() {

    }

    render() {
        return (<div className="create-notebook-form">
            <div className={this.state.overlayState + "overlay"} onClick={this.hideShare} />
            <div className={this.state.overlayState + "overlay--create-notebook form-style"}>
                <form>
                    <div className="form--text"><input type="text" placeholder="Query ..." /></div>
                    <Button wrapperClass="form--submit" type="submit" title="Share Notebook" onClick={this.share}/>
                </form>
            </div>
        </div>);
    }
}