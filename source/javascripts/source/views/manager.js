import React from "../../lib/react.js";
import ToolbarView from "./subviews/toolbar";
import Button from "./forms/button.js";

export default class ManagerView extends React.Component {

	constructor(props) {
		super(props);

		this.state = { close : false };

		this.parent = props.parentHandler;

        this.parentToolbar = { backCallback : this.back, logoutCallback : this.logout, user_hash : this.parent.getUser().user_hash,
            notebook_hash : this.parent.getCurrentNotebook().notebook_hash, query : this.pageSearch, manager : this.manager};
	}

	render() {
		return (<div className="notebooks-view">
            <ToolbarView dataIntro="Click"
                         dataStep="1" page={this.parent.getUser().company_name + " < " + this.parent.getCurrentNotebook().name}
                         parentHandler={this.parentToolbar} visible={this.state.close} hasShare={true} hasBack={true} query={this.state.query} isManagerUI={true} />
		</div>);
	}

}