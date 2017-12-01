import React from "../../lib/react.js";

import User from "../models/user.js";

import ToolbarView from "./subviews/toolbar";
import * as Utils from "../utils.js";

export default class ManagerView extends React.Component {

	constructor(props) {
		super(props);

		this.state = { close : false, manager: true, userPermissions: [], currentPermissions: {}};

		this.currentUser = {};

		this.parent = props.parentHandler;

		this.getUsers = this.getUsers.bind(this);
		this.displayUsers = this.displayUsers.bind(this);
		this.displayPermissions = this.displayPermissions.bind(this);
		this.editPermissions = this.editPermissions.bind(this);
		this.savePermissions = this.savePermissions.bind(this);
		this.renderCurrentPermissions = this.renderCurrentPermissions.bind(this);

		this.settings = this.settings.bind(this);
		this.logout = this.logout.bind(this);
		this.back = this.back.bind(this);

        	this.parentToolbar = { backCallback : this.back, logoutCallback : this.logout, user_hash : this.parent.getUser().user_hash,
            	notebook_hash : this.parent.getCurrentNotebook().notebook_hash, manager : this.back, settings : this.settings};
	
		/*var userPermissions = this.getUsers(); // Array of user hashes
		console.log("All: " + userPermissions);
		if (typeof userPermissions != "undefined") {
			//this.setState({ userPermissions: userPermissions});
		}*/

	}

	componentDidMount() {
		this.getUsers();	
	}

	getUsers() {
		//None of this code is finished, the details of the api call are unknown
		fetch("http://endor-vm1.cs.purdue.edu/getCompanyUsersPermission", {
    			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				user_hash : this.parent.getUser().user_hash,
				notebook_hash : this.parent.getCurrentNotebook().notebook_hash,            
			})
		}).then(function(response) {
			if(response.ok) {
				var json = response.json();
				return json;
			}
			throw new Error("Network response was not ok.");
		}).then(function(data) {
			var allPermissions = [];
			for(let user in data) {
				const permissions = data[user]

			        console.log(user,permissions);
				Utils.post("user", { user_hash : user }, function(json) {
					allPermissions.push({ user : new User(json), permission : permissions});
					this.setState({userPermissions: allPermissions});
				}.bind(this));
			}
		}.bind(this));
	}

	savePermissions() {

		var newObject = {};
		newObject[this.currentUser] = this.state.currentPermissions;	
		var changes = [newObject];

		fetch("http://endor-vm1.cs.purdue.edu/setNotebookPermissions", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				user_hash : this.currentUser.user_hash,
				notebook_hash : this.parent.getCurrentNotebook().notebook_hash,
				changes : changes
			})
		}).then(function(response) {
			if(response.ok) {
				var json = response.json();
				return json;
			}
			throw new Error("Network response was not ok.");
		});	
	}

	displayUsers() {
		console.log("permissions : " + this.state.userPermissions);

		var userDivs = [];
		for (var i = 0; i < this.state.userPermissions.length; i++) 
		{
			var object = this.state.userPermissions[i];
			var propVal;
			for (var propName in object) {
				propVal = object[propName];
				console.log("name: " + propName + " val: " + propVal);
				if (propVal == false) {
					//Do not list user
					console.log("not listing: " + object["user_hash"]);
				}
				else {
					//Add div for each user
					var currentPermissions = object["permission"];
					this.currentUser = object["user"];
					userDivs.push(	<div> 
								<a href="#" onClick={this.displayPermissions.bind(this, currentPermissions)}> {object["user"].email} </a>
							</div>);
					
				}
			}
		}
	        return (<div> {userDivs} </div>);	
	}	    
		
	displayPermissions(currentPermissions) {
		console.log("DisplayPermissions");
		this.setState({currentPermissions: currentPermissions});
		var permissionValue;
		for (var permissionName in currentPermissions) {
			permissionValue = currentPermissions[permissionName];
			console.log("permission: " + permissionName + "value: " + permissionValue);
			
		}
		
	}

	renderCurrentPermissions() {
		console.log("rendering current permissions");
		var read = this.state.currentPermissions["read"] ? this.state.currentPermissions["read"] : false;
		var write = this.state.currentPermissions["write"] ? this.state.currentPermissions["write"] : false;
		var manager = this.state.currentPermissions["manager"] ? this.state.currentPermissions["manager"] : false;
		
		return	<form>
				{read ? <div><input type="checkbox" name="read" checked onChange={(e) => (this.editPermissions("read"))} /> read <br /></div> :  <div><input type="checkbox" name="" /> read <br /></div>}
				{write ? <div><input type="checkbox" name="write" checked onChange={(e) => (this.editPermissions("write"))}/> write <br /></div> :  <div><input type="checkbox" name="" /> write <br /></div>}
				{manager ? <div><input type="checkbox" name="manager" checked onChange={(e) => (this.editPermissions("manager"))}/> manager <br /></div> :  <div><input type="checkbox" name="" /> manager <br /></div>}
			</form>
	}

	editPermissions(name) {
		this.state.currentPermissions[name] = !this.state.currentPermissions[name]; 
		this.setState({currentPermissions: this.state.currentPermissions});
	}

	settings(mode) {
		console.log("HERE");
		const imageSetting = mode === "stateInline " ? "inline" : "below";
		console.log(imageSetting);
		Utils.post("format", { user_hash : this.parent.getUser().user_hash, notebook_hash : this.parent.getCurrentNotebook().notebook_hash, settings : { image : imageSetting }}, function() {

			this.parent.getCurrentNotebook().settings = { image : imageSetting };
			console.log(this.parent.getCurrentNotebook().settings)
		}.bind(this), function(error) {console.log(error);});
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
				<div className="admin-ui container">
					<div className="admin-ui user-list">
						{this.displayUsers()}
					</div>
					<div id="permissionChecklist" className="admin-ui permission-selector">
						{this.renderCurrentPermissions()}
					</div>
					<input type="submit" title="Submit" onClick={this.savePermissions} />
				</div>
			</div>);
	}

}
