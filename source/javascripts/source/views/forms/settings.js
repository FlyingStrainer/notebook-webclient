import React from "../../../lib/react.js";
import TagsInput from "../../../lib/react-tagsinput.js";

import Button from "./button.js";

export default class SettingsForm extends React.Component {
    constructor(props) {
        super(props);

	    this.state = { overlayState : "stateLoad " };

        this.showSettings = this.showSettings.bind(this);
        this.hideSettings = this.hideSettings.bind(this);
        this.settings = this.settings.bind(this);
    }

    showSettings() {
        this.setState({ overlayState : "stateShow " });
    }

    hideSettings() {
        this.textInput.value = "";
        this.setState({ overlayState : "stateHide ", tags : [], tag : "" });
    }

    settings() {

    }

    render() {
        return (<div className="query-form">
            <div className={this.state.overlayState + "overlay"} onClick={this.hideSettings} />
            <div className={this.state.overlayState + "overlay--form overlay--settings form-style"}>
                <form>
                    <div className="form--textarea">
                        <textarea placeholder="Text ..." ref={(input) => ( this.textInput = input )}/>
                    </div>
                    <Button wrapperClass="form--submit" type="submit" title="Query" onClick={this.settings}/>
                </form>
            </div>
        </div>);
    }
}