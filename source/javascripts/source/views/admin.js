import React from "../../lib/react.js";
import ToolbarView from "./subviews/toolbar";
import Button from "./forms/button.js";

export default class AdminView extends React.Component {

	constructor(props) {
		super(props);

		this.state = { close : false, manager : true };

		this.parent = props.parentHandler;

		this.logout = this.logout.bind(this);
		this.back = this.back.bind(this);

		this.parentToolbar = { backCallback : this.back, logoutCallback : this.logout, user_hash : this.parent.getUser().user_hash,
			notebook_hash : this.parent.getCurrentNotebook().notebook_hash, manager : this.back};
	}

	back() {
		this.setState({ pageState : "stateExit stateTransition ", manager : false });

		setTimeout(function() {
			this.parent.back();
		}.bind(this), 300);
	}

	logout() {
		this.setState({ pageState : "stateExit stateTransition ", close : true });

		setTimeout(function(){
			this.parent.logout();
		}.bind(this), 300);
	}

	render() {
		return (<div className="notebooks-view">
			<ToolbarView dataIntro="Click"
			             dataStep="1" page={this.parent.getUser().company_name + " < " + this.parent.getCurrentNotebook().name}
			             parentHandler={this.parentToolbar} visible={this.state.close} hasShare={true} hasBack={true} isManagerUI={this.state.manager} />
		</div>);
	}

}
