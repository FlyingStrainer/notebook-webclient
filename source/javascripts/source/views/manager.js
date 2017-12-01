import React from "../../lib/react.js";
import ToolbarView from "./subviews/toolbar";
import Button from "./forms/button.js";

export default class ManagerView extends React.Component {

	constructor(props) {
		super(props);

		this.parent = props.parentHandler;
		this.state = { notebookList : [], close : false, createNotebookState : "stateLoad " };
	}

	componentDidMount() {
		setTimeout(function() {
			this.setState({buttonState: "stateLoad stateTransition "});
			setTimeout(function() {
				this.setState({buttonState: ""});
			}.bind(this), 300);
		}.bind(this), 300);
	}

	render() {
		return (<div className="notebooks-view">
			<ToolbarView page={this.parent.getUser().company_name} parentHandler={this.parentToolbar} visible={this.state.close} hasBack={false}/>
			<div className="list-view">
				{this.parent.getUser().permissions.create_notebooks ?
					<div className="notebooks--notebook notebooks--create-notebook" onClick={this.toggleCreateNotebook}>
						<div className="notebook--create-icon" />
					</div> : null}
				<div className="notebooks--notebook-list">
					{this.state.notebookList.map(notebook => (
						<NotebookView parentHandler={this.parentNotebook} notebook={notebook} visible={this.state.close}/>
					))}
				</div>
			</div>
		</div>);
	}

}