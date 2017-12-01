import React from "../../../lib/react.js";
import TagsInput from "../../../lib/react-tagsinput.js";

import Button from "./button.js";

export default class SettingsForm extends React.Component {
    constructor(props) {
        super(props);

        this.submitCallback = props.submitCallback;

	    this.state = { overlayState : "stateLoad ", imageState : "stateBelow " };

        this.showSettings = this.showSettings.bind(this);
        this.hideSettings = this.hideSettings.bind(this);
        this.mode = this.mode.bind(this);
        this.settings = this.settings.bind(this);
    }

    showSettings() {
        this.setState({ overlayState : "stateShow " });
    }

    hideSettings() {
        this.setState({ overlayState : "stateHide " });
    }

    mode(mode) {
        this.setState({ imageState : "state" + mode + " " });
    }

    settings() {
        this.hideSettings();
        this.submitCallback(this.state.imageState);
    }

    render() {
        return (<div className="query-form">
            <div className={this.state.overlayState + "overlay"} onClick={this.hideSettings} />
            <div className={this.state.overlayState + "overlay--form overlay--settings form-style"}>
                <form>
                    <div className={this.state.imageState + "settings--image-list"}>
                        <Button wrapperClass="image-inline" type="button" title="Image Inline" onClick={() => (this.mode("Inline"))} />
                        <Button wrapperClass="image-below" type="button" title="Image Below" onClick={() => (this.mode("Below"))} />
                    </div>
                    <Button wrapperClass="form--submit" type="submit" title="Save" onClick={this.settings}/>
                </form>
            </div>
        </div>);
    }
}