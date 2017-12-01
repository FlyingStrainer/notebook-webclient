import React from "../../../lib/react.js";

export default class ToolbarView extends React.Component {
	constructor(props) {
		super(props);

		this.parent = props.parentHandler;
		this.name = props.page;
		this.hasBack = props.hasBack;
		this.searchFunction = props.searchFunction;

		this.state = {toolbarState : "stateLoad ", searchBarState : "stateHide "};

		this.toggleSearchBar = this.toggleSearchBar.bind(this);
		this.searchFunction = this.searchFunction.bind(this);
	}

	componentDidMount() {
        setTimeout(function() {
            this.setState({toolbarState: "stateLoad stateTransition "});
            setTimeout(function() {
                this.setState({toolbarState: ""});
            }.bind(this), 300);
        }.bind(this), 300);
    }

    searchForText(text){
	return this.searchFunction(text);	
    }

    componentWillReceiveProps(nextProps) {
	    if(nextProps.visible !== this.props.visible) {
	        this.setState({toolbarState : "stateExit stateTransition "});
        }
    }

    toggleSearchBar(event) {
	console.log("Toggling SearchBar");
	this.searchFunction();
        if(this.state.searchBarState === "stateHide")
            this.setState({searchBarState : "stateShow "});
        else
            this.setState({searchBarState : "stateHide "});
    }
/*<div className="toolbar--search-view">
<div className="form--text toolbar--search-bar"><input name="search" type="text" placeholder="Search" onChange={this.parent.searchHandler} /></div>
</div>*/

	render() {
		return <div className={this.state.toolbarState + "toolbar-view"}>
            {this.hasBack === true ? <a className="toolbar--back" href="#" onClick={e => (e.preventDefault(), this.parent.backCallback(e))} /> : null}
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
