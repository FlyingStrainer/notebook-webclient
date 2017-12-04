import React from "../../../lib/react.js";

import Button from "./button.js";

import * as Utils from "../../utils.js";

export default class ShareForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { overlayState : "stateLoad ", shareState : "", text : "" };

        this.showShare = this.showShare.bind(this);
        this.hideShare = this.hideShare.bind(this);
        this.share = this.share.bind(this);
        this.download = this.download.bind(this);

        this.notebook_hash = props.notebook;
    }

    showShare() {
        this.setState({ overlayState : "stateShow " });
    }

    hideShare() {
        this.setState({ overlayState : "stateHide ", shareState : "", text : "" });
    }

    share() {
        Utils.post("sharePDF", { notebook_hash : this.notebook_hash }, function(json) {
            this.setState({ shareState : "stateShare ", text : json.url });
            this.copy.select();
        }.bind(this), error => console.log(error));
    }

    download() {
        window.downloadFile("http://endor-vm1.cs.purdue.edu/downloadPDF/" + this.notebook_hash);

        this.hideShare();
    }

    render() {
        return (<div className="create-notebook-form">
            <div className={this.state.overlayState + "overlay"} onClick={this.hideShare} />
            <div className={this.state.overlayState + "overlay--form overlay--share form-style"}>
                <form>
                    <div className={this.state.shareState + "share"}>
                        <Button wrapperClass="form--submit" type="button" title="Share" onClick={this.share}/>
                        <div className="share-text">
                            <input className="share-text" type="text" value={this.state.text} ref={copy_field => {this.copy = copy_field}}/>
                        </div>
                        <Button wrapperClass="form--submit" type="submit" title="Download" onClick={this.download}/>
                    </div>
                </form>
            </div>
        </div>);
    }
}
