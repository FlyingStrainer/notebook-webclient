import React from "../../lib/react.js";
import * as DataEntry from "./dataentry.js";
import Button from "../views/subviews/button"

export default class ReviewEntryForm extends React.Component {
    constructor(props) {
        super(props);

        this.user = props.user;

        this.permissions = props.permissions;

        this.deleteCallback = props.deleteCallback;
        this.cosignCallback = props.cosignCallback;

	// 0 = inline, 1 = below text
	this.formattingRule = props.format;
	this.formattingRule = 1; // REMOVE -- For testing

        this.state = {entry : undefined};
	this.formatTextAndImage.bind(this);
    }

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);

		this.setState({entry : nextProps.entry});
	}
    formatTextAndImage() {
	if(this.formattingRule == 0) {
		// CaptionedImage here for inline formatting
		return <div>
				<CaptionedImage image={this.state.entry.image} caption={this.state.entry.caption} />
                		<p>{this.state.entry.text}</p>
			</div>
	}
	else if(this.formattingRule == 1) {
		// CaptionedImage here for images below text
		return <div>
        	        	<p>{this.state.entry.text}</p>
				<CaptionedImage image={this.state.entry.image} caption={this.state.entry.caption} />
			</div>
	}
    }
    render() {
        return (<form>
            {this.state.entry === undefined ? null :
                <div>
                    <div className="data-entry--background">
                        <h3 className="data-entry--author">{this.state.entry.author}</h3>
                        <h4 className="data-entry--date">{this.state.entry.getDate()}</h4>
			{this.formatTextAndImage()}
                    </div>
                    {this.permissions.manager ? <div className="form--half"><Button wrapperClass="cosign" type="submit" title="Cosign" onClick={e => (this.cosignCallback(this.entry, "cosign"))} /></div> : null}
                    {this.permissions.write && this.user.user_hash === this.state.entry.author ?
                        <div className="form--half"><Button wrapperClass="delete" type="submit" title="Delete" onClick={e => (this.deleteCallback(this.entry, "delete"))} /></div> : null}
                </div>}
        </form>);
    }
}

class CaptionedImage extends React.Component {
	constructor(props) {
		super(props);
		this.image = props.image;
		this.caption = props.caption;
	}

	render() {
		return 	<div className="data-entry--captioned-image">
            			<img className="data-entry--image" src={this.image} />
            			<p className="data-entry--caption">{this.caption}</p>
			</div>;
	}
}
