import React from "../lib/react.js";

import LoginView from "./views/login.js";
import Notebooks from "./views/notebooks.js";
import NotebookPages from "./views/pages.js";

import PushNotification from "./views/subviews/cosignnotification.js";

import User from "./models/user.js";
import ManagerView from "./views/manager"
import DevFeedbackView from "./views/subviews/devfeedback";
import * as Utils from "./utils.js";
import AdminView from "./views/admin"

window.downloadFile = function (sUrl) {

    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
        //alert('Your device does not support files downloading. Please try again in desktop browser.');
        window.open(sUrl, '_blank');
        return false;
    }

    //If in Chrome or Safari - download via virtual link click
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;
        link.setAttribute('target','_blank');

        if (link.download !== undefined) {
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }

        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }

    // Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
        sUrl += '?download';
    }

    window.open(sUrl, '_blank');
    return true;
};

window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

class VENote extends React.Component {
	constructor(props) {
		super(props);

		if(typeof(Storage) !== "undefined" && localStorage.getItem("user_hash") !== "undefined") {
		    this.state = { view : "blankView", pushView : false, toolbarState : false };
        }
        else {
            this.state = { view : "", pushView : false, toolbarState : false };
        }

		this.login = this.login.bind(this);
		this.getUser = this.getUser.bind(this);

		this.notebook = this.notebook.bind(this);
		this.getNotebooks = this.getNotebooks.bind(this);
		this.setNotebooks = this.setNotebooks.bind(this);

		this.getCurrentNotebook = this.getCurrentNotebook.bind(this);

		this.manager = this.manager.bind(this);
		this.back = this.back.bind(this);
		this.logout = this.logout.bind(this);
		this.manager = this.manager.bind(this);

		this.parentHandler = { getUser : this.getUser, getNotebooks : this.getNotebooks, setNotebooks : this.setNotebooks,
                                getCurrentNotebook : this.getCurrentNotebook, back : this.back, logout : this.logout, manager : this.manager };
	}

    componentDidMount() {
        if(this.state.view === "blankView" && typeof(Storage) !== "undefined" && localStorage.getItem("user_hash") !== "undefined") {
            Utils.post("user", { user_hash : localStorage.getItem("user_hash") }, function(json) {
                this.login(json);
            }.bind(this), function(error) {
                console.log(error);
                this.setState({ view : "" });
            }.bind(this));
        }
    }

	login(responseJson) {
	    this.user = new User(responseJson);
	    this.notebooks = this.user.notebooks;
	    if(typeof(Storage) !== "undefined") {
	        localStorage.setItem("user_hash", this.user.user_hash);
        }

		this.setState({ view : "notebookView" });
	}

	getUser() {
		return this.user;
	}

	notebook(notebook) {
        this.currentNotebook = notebook;
        this.setState({ view : "pageView", toolbarState : false });
	}

	manager() {
		if(this.state.view === "pageView")
	        this.setState({ view : "managerView" });
		else
			this.setState({ view : "adminView" });
	}

	getNotebooks() {
		return this.notebooks;
	}

	setNotebooks(notebooks) {
		this.notebooks = notebooks;
	}

	getCurrentNotebook() {
	    return this.currentNotebook;
	}

	back() {
        if(this.state.view === "pageView") {
            this.currentNotebook = undefined;
            this.setState({ view : "notebookView", toolbarState : false });
        }
        else if(this.state.view === "managerView") {
            this.setState({ view : "pageView", toolbarState : true });
        }
        else if(this.state.view === "adminView") {
        	this.setState({ view : "notebookView", toolbarState : true });
        }
	}

	logout(e) {
        //this.user = undefined;
        this.notebooks = undefined;
        this.currentNotebook = undefined;

        if(this.socket !== undefined)
        {
            this.socket.close();
            this.socket = undefined;
        }

        if(typeof(Storage) !== "undefined") {
            localStorage.setItem("user_hash", undefined);
        }

        this.setState({view : "", pushView : false, feedbackView : false});
	}

	render() {
		return (<div id="venoteview">
			<div id="renderview">
				{this.state.view === "notebookView" ? <Notebooks load={this.state.toolbarState} callback={this.notebook} parentHandler={this.parentHandler}/>
				: this.state.view === "pageView" ? <NotebookPages load={this.state.toolbarState} parentHandler={this.parentHandler}/>
				: this.state.view === "managerView" ? <ManagerView parentHandler={this.parentHandler} />
				: this.state.view === "adminView" ? <AdminView parentHandler={this.parentHandler}/>
				: this.state.view === "" ? <LoginView callback={this.login} /> 
				: null}
			</div>
            <div id="feedbackview">
                {this.state.view !== "" && this.state.view !== "blankView" ? <DevFeedbackView parentHandler={this.parentHandler} /> : null}
            </div>
			<div id="pushview">
				{this.state.pushView ? <PushNotification parentHandler={this.parentHandler} data={this.push_data} /> : null}
			</div>
		</div>);
	}
}

//ReactDOM.render(<DataEntryForm >, document.getElementById("root"));
document.addEventListener("DOMContentLoaded", function() {
	ReactDOM.render(<VENote view={ document.body.className } />, document.getElementById("root"));
});
