import React from "../../../lib/react.js";

import Button from "./button.js";

import * as Utils from "../../utils.js";

export default class ShareForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { overlayState : "stateLoad " };

        this.showShare = this.showShare.bind(this);
        this.hideShare = this.hideShare.bind(this);
        this.share = this.share.bind(this);
        this.download = this.download.bind(this);

        this.notebook_hash = props.notebook_hash;
    }

    showShare() {
        this.setState({ overlayState : "stateShow " });
    }

    hideShare() {
        this.setState({ overlayState : "stateHide " });
    }

    share() {
        Utils.post("pdfShare", { notebook_hash : this.notebook_hash }, function(json) {
            console.log(json);
        }.bind(this), error => console.log(error));
    }

    download() {
        Utils.post("pdfDownload", { notebook_hash : this.notebook_hash }, function (json) {
            console.log(json);
        }.bind(this), error => console.log(error));

        this.hideShare();
    }

    render() {
        return (<div className="create-notebook-form">
            <div className={this.state.overlayState + "overlay"} onClick={this.hideShare} />
            <div className={this.state.overlayState + "overlay--form overlay--share form-style"}>
                <form>
                    <div className="share">
                        <Button wrapperClass="form--submit" type="button" title="Share" onClick={this.share}/>
                        <Button wrapperClass="form--submit" type="submit" title="Download" onClick={this.download}/>
                    </div>
                </form>
            </div>
        </div>);
    }
}
