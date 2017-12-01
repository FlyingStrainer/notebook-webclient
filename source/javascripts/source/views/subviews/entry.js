import React from "../../../lib/react.js";

export default class Entry extends React.Component {
    constructor(props) {
        super(props);

        console.log(props.entry);

        this.state = { entry : props.entry };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.state.entry) {
            console.log(nextProps.entry);
	        this.setState({ entry : nextProps.entry });
        }
    }

    render() {
        return (<div className="data-entry--background">
            <h3 className="data-entry--author">{this.state.entry.author}</h3>
            <h4 className="data-entry--date">{this.state.entry.date_created}</h4>
            {this.state.entry.text ? <p>{this.state.entry.text}</p> : null}
            {this.state.entry.image ? <img className="data-entry--image" src={this.state.entry.image} /> : null}
            {this.state.entry.caption ? <p className="data-entry--caption">{this.state.entry.caption}</p> : null}
        </div>);
    }
}