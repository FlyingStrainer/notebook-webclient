import React from "../../../lib/react.js";

export default class ToolbarView extends React.Component {
	constructor(props) {
		super(props);

		this.parent = props.parentHandler;
		this.name = props.page;
		this.hasBack = props.hasBack;

		this.state = {toolbarState : "stateLoad ", searchBarState : "stateHide "};

		this.toggleSearchBar = this.toggleSearchBar.bind(this);
		this.testButton = this.testButton.bind(this);
	}

	componentDidMount() {
        setTimeout(function() {
            this.setState({toolbarState: "stateLoad stateTransition "});
            setTimeout(function() {
                this.setState({toolbarState: ""});
            }.bind(this), 300);
        }.bind(this), 300);
        setTimeout(function() {
            this.setState({toolbarState: "stateLoad stateTransition "});
            setTimeout(function() {
                this.setState({toolbarState: ""});
            }.bind(this), 300);
        }.bind(this), 300);
    }

    componentWillReceiveProps(nextProps) {
	    if(nextProps.visible !== this.props.visible) {
	        this.setState({toolbarState : "stateExit stateTransition "});
        }
        else if(nextProps.visible !== this.props.visible) {
            this.setState({toolbarState : "stateExit stateTransition "});
        }
    }

    testButton() {
	console.log("Search Initiated");	
	// Incomplete - needs testing
        fetch('PLACEHOLDER_URL', {
                method: 'POST',
                headers: {
			'Accept': 'application/json',
	                'Content-Type': 'appication/json'
		},
		body: ""
        });
    }

    toggleSearchBar(event) {
	this.parent.toggleSearchBar(event); // This may not be used
        if(this.state.searchBarState === "stateHide")
            this.setState({searchBarState : "stateShow "});
        else
            this.setState({searchBarState : "stateHide "});
	console.log("Toggled");
    }

/*<div className="toolbar--search-view">
<div className="form--text toolbar--search-bar"><input name="search" type="text" placeholder="Search" onChange={this.parent.searchHandler} /></div>
</div>*/

	render() {
		return <div className={this.state.toolbarState + "toolbar-view"}>
            		{this.hasBack === true ? <a className="toolbar--back" href="#" onClick={this.testButton, e => (e.preventDefault(), this.parent.backCallback(e))} /> : null}
			<div className="toolbar--title">
				{this.name}
			</div>
            		<div className="toolbar--right-icons">
                		<a className="toolbar--search" href="#" onClick={e => (e.preventDefault(), this.toggleSearchBar(e))} />
                		<a className="toolbar--logout" href="#" onClick={e => (e.preventDefault(), this.parent.logoutCallback(e))} />
            		</div>
		</div>
	}
}
