import React from "../../lib/react.js";
import ToolbarView from "./subviews/toolbar";
import Button from "./forms/button.js";

export default class ManagerView extends React.Component {

	constructor(props) {
		super(props);

		this.state = { close : false, userPermissions: [], currentPermissions: {}};

		this.parent = props.parentHandler;

		this.getUsers = this.getUsers.bind(this);
		this.displayUsers = this.displayUsers.bind(this);
		this.displayPermissions = this.displayPermissions.bind(this);

		/*var userPermissions = this.getUsers(); // Array of user hashes
		console.log("All: " + userPermissions);
		if (typeof userPermissions != "undefined") {
			//this.setState({ userPermissions: userPermissions});
		}*/

        	this.parentToolbar = { 	backCallback : this.back, 
					logoutCallback : this.logout, 
					user_hash : this.parent.getUser().user_hash,
            				notebook_hash : this.parent.getCurrentNotebook().notebook_hash, 
					query : this.pageSearch, manager : this.manager
				     };

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
			var permissions;
			for(var user in data) {
				permissions = data[user]

			        console.log(user,permissions);
				var userPermission = 	{
								user_hash : user,
								permission : permissions
							};			
				allPermissions.push(userPermission);
				console.log("All1: " + allPermissions);	
			}
			this.setState({userPermissions: allPermissions});
			return allPermissions;
		}.bind(this));
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
					userDivs.push(	<div> 
								<a href="#" onClick={this.displayPermissions.bind(this, currentPermissions)}> {object["user_hash"]} </a>
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
				{read ? <div><input type="checkbox" name="" checked /> read <br /></div> :  <div><input type="checkbox" name="" /> read <br /></div>}
				{write ? <div><input type="checkbox" name="" checked /> write <br /></div> :  <div><input type="checkbox" name="" /> write <br /></div>}
				{manager ? <div><input type="checkbox" name="" checked /> manager <br /></div> :  <div><input type="checkbox" name="" /> manager <br /></div>}
			</form>
	}

	render() {
		return (<div className="notebooks-view">
            			<ToolbarView dataIntro="Click"
                        	 dataStep="1" page={this.parent.getUser().company_name + " < " + this.parent.getCurrentNotebook().name}
                        	 parentHandler={this.parentToolbar} visible={this.state.close} hasShare={true} hasBack={true} query={this.state.query} isManagerUI={true} />
				<div className="admin-ui container">
					<div className="admin-ui user-list">
						{this.displayUsers()}
					</div>
					<div id="permissionChecklist" className="admin-ui permission-selector">
						{this.renderCurrentPermissions()}
					</div>
				</div>
			</div>);
	}

}
