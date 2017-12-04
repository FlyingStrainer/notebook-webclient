import React from "../../../lib/react.js";

export default class NotebookView extends React.Component {
    constructor(props) {
        super(props);

        this.parent = props.parentHandler;
        this.notebook = props.notebook;

        this.state = {notebookState : "stateLoad "};
    }

    componentDidMount() {
        this.mounted = true;
        setTimeout(function() {
            if(this.mounted) {
                this.setState({ notebookState: "stateLoad stateTransition " });

                setTimeout(function() {
                    if(this.mounted && this.state.notebookState === "stateLoad stateTransition ")
                        this.setState({ notebookState: "" });

                }.bind(this), 300);
            }
        }.bind(this), 300);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (<a className={this.state.notebookState + "notebooks--notebook"} onClick={e => (e.preventDefault(), this.parent.openNotebook(this.notebook))}>
            <div className="notebook--title">{this.notebook.name}</div>
            <div className="notebook--scribbles" style={{background : "url('http://endor-vm1.cs.purdue.edu/icon/" + this.notebook.notebook_hash + "') no-repeat", "background-size" : "contain"}}/>
        </a>);
    }
}
