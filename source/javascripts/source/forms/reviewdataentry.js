import React from "../../lib/react.js";

export default class ReviewEntryForm extends React.Component {
    constructor(props) {
        super(props);

        this.entry = props.entry;
        this.user = props.user;
    }

    render() {
        return (<div className="data-entry">
            {this.entry === undefined ? null :
                <div>
                    <h3 className="data-entry--author">{this.entry.author}</h3>
                    <h4 className="data-entry--date">{this.entry.getDate()}</h4>
                    <p>{this.entry.text}</p>
                    <img className="data-entry--image" src={this.entry.image} />
                    <p className="data-entry--caption">{this.entry.caption}</p>
                </div>}
        </div>);
    }
}