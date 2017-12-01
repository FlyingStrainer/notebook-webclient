import React from "../../../lib/react.js";

export default class Entry extends React.Component {
	constructor(props) {
		super(props);

		this.notebook = props.notebook;
		this.state = { entry : props.entry };

		console.log(this.notebook.settings);

		this.formatTextAndImage = this.formatTextAndImage.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps !== this.state.entry) {
			this.setState({ entry : nextProps.entry });
		}
	}

	formatTextAndImage() {
		if(this.notebook.settings.image === "inline") {
			// CaptionedImage here for inline formatting
			return <div>
				{this.state.entry.image ? <CaptionedImage className="inline data-entry--image" image={this.state.entry.image} caption={this.state.entry.caption}/> : null}
				{this.state.entry.text ? <p>{this.state.entry.text}</p> : null}
            </div>
		}
		else {
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
            <div className="data-entry--captioned-image">
                <img className="data-entry--image" src={this.image} />
                <p className="data-entry--caption">{this.caption}</p>
            </div>
        </div>;
	}
}
