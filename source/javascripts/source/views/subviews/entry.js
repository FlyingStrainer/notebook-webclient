import React from "../../../lib/react.js";

export default class Entry extends React.Component {
    constructor(props) {
        super(props);

        this.entry = props.entry;
    }

    render() {
        return (<div className="data-entry">
            <h3 className="data-entry--author">{this.entry.author}</h3>
            <h4 className="data-entry--date">{this.entry.getDate()}</h4>
            <p>{this.entry.text}</p>
	    <CaptionImage image={this.entry.image} caption={this.entry.caption} />
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
