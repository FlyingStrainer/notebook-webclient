import React from "../../../lib/react.js";

export default class Entry extends React.Component {
    constructor(props) {
        super(props);

	this.formattingRule = props.formattingRule;

        console.log(props.entry);

        this.state = { entry : props.entry };

	this.formatTextAndImage = this.formatTextAndImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.state.entry) {
            console.log(nextProps.entry);
	        this.setState({ entry : nextProps.entry });
        }
    }

    formatTextAndImage() {
	if(this.formattingRule == 0) {
		// CaptionedImage here for inline formatting
		return <div>
            			{this.state.entry.image ? <CaptionedImage className="data-entry--image" image={this.state.entry.image} caption={this.state.entry.caption}/> : null}
            			{this.state.entry.text ? <p>{this.state.entry.text}</p> : null}
			</div>
	}
	else if(this.formattingRule == 1) {
		// CaptionedImage here for images below text
		return <div>
            			{this.state.entry.text ? <p>{this.state.entry.text}</p> : null}
            			{this.state.entry.image ? <CaptionedImage className="data-entry--image" image={this.state.entry.image} caption={this.state.entry.caption}/> : null}
			</div>
	}
    }

    render() {
        return (<div className="data-entry--background">
            <h3 className="data-entry--author">{this.state.entry.author}</h3>
            <h4 className="data-entry--date">{this.state.entry.date_created}</h4>
	    {this.formatTextAndImage()}
        </div>);
    }
}

class CaptionedImage extends React.Component {
	constructor(props) {
		super(props);
		this.image = props.image;
		this.caption = props.caption;
	}

	render() {
		return <div>
				Stuff
				<div className="data-entry--captioned-image">
            				<img className="data-entry--image" src={this.image} />
            				<p className="data-entry--caption">{this.caption}</p>
				</div>
			</div>;
	}
}
