import React from "../../../lib/react.js";

export default class PageView extends React.Component {

    constructor(props) {
        super(props);

        this.parent = props.parentHandler;
        this.entry = props.entry;

        this.state = { entryState : "stateLoad " };
    }

    componentDidMount() {
        this.mounted = true;
        setTimeout(function() {
            if(this.mounted) {
                this.setState({ entryState: "stateLoad stateTransition " });

                setTimeout(function() {
                    if(this.mounted && this.state.entryState === "stateLoad stateTransition ")
                        this.setState({ entryState: "" });

                }.bind(this), 300);
            }
        }.bind(this), 300);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (<a className={this.state.entryState + "entries--entry"} onClick={e => (e.preventDefault(), this.parent.reviewEntry(this.entry))}>
            <div className="entry--title">{this.entry.author}</div>
            <div className="entry--date">{this.entry.date_created}</div>
            <div className="notebook--scribbles" />
        </a>);
    }
}