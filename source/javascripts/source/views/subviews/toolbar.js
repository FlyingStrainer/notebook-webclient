import React from "../../../lib/react.js";

import QueryForm from "../forms/query.js";
import ShareForm from "../forms/share.js";

import * as Utils from "../../utils.js";
import SettingsForm from "../forms/settings"

export default class ToolbarView extends React.Component {
	constructor(props) {
		super(props);

		this.parent = props.parentHandler;
		this.name = props.page;
		this.hasBack = props.hasBack;

		// Currently unused, may be deleted
		this.searchFunction = props.searchFunction;

		this.hasShare = props.hasShare;
		this.isManager = props.isManager;
		this.dataIntro = props.dataIntro;
		this.dataStep = props.dataStep;

		this.state = { toolbarState : (this.isManagerUI ? "" : "stateLoad "), query : props.query, isManagerUI : props.isManagerUI };

		this.toggleSearchBar = this.toggleSearchBar.bind(this);
		//this.searchFunction = this.searchFunction.bind(this);

		this.backup = this.backup.bind(this);
		this.shareCallback = this.shareCallback.bind(this);
	}

	componentDidMount() {
		if(!this.isManagerUI) {
			setTimeout(function() {
				this.setState({toolbarState: "stateLoad stateTransition "});
				setTimeout(function() {
					this.setState({toolbarState: ""});
				}.bind(this), 300);
			}.bind(this), 300);
		}
	}

	searchForText(text){
		return this.searchFunction(text);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.visible !== this.props.visible)
			this.setState({ toolbarState : "stateExit stateTransition " });
		if(nextProps.query !== this.state.query) {
			this.setState({ query : nextProps.query });
		}
		if(nextProps.isManagerUI !== this.state.isManagerUI) {
			this.setState({ isManagerUI : nextProps.isManagerUI });
		}
	}

	backup() {
		const errorFunc = function(error) {
			alert("error in backup!");
		}.bind(this);

		Utils.post("getBackup", { notebook_hash : this.parent.notebook_hash }, function(json) {
			setTimeout(function(){
				alert("Backup was a success. Very nice!");
				// prompt("Your share link", json.url);
			}.bind(this), 300);

		}.bind(this), errorFunc);
	}

	toggleSearchBar(event) {

		this.parent.toggleSearchBar(event); // This may not be used

		if(this.state.searchBarState === "stateHide")
			this.setState({searchBarState : "stateShow "});
		else
			this.setState({searchBarState : "stateHide "});
	}

	shareCallback() {
		const errorFunc = function(error) {
			alert("error");
		}.bind(this);

		Utils.post("makePDF", { notebook_hash : this.parent.notebook_hash }, function(json) {

			setTimeout(function(){
				// alert(JSON.stringify(json, null, 2));
				// alert(json.url);
				prompt("Your share link", json.url);
			}.bind(this), 300);

		}.bind(this), errorFunc);
	}

	render() {
		if(this.dataIntro && this.dataStep) {
			return (<div className="toolbar-container">
				<div data-intro={this.dataIntro} data-step={this.dataStep} className={this.state.toolbarState + "toolbar-view"}>
					{this.hasBack === true ? <a className="toolbar--back" href="#" onClick={e => (this.parent.backCallback())} /> : null}
					<div className="toolbar--title">{this.name}</div>
					<div className="toolbar--right-icons">
						{this.state.isManagerUI && this.state.isManagerUI !== 2 ? <a className="toolbar--back-up" href="#" onClick={e => (e.preventDefault(), this.backup())}/> : null}
						{this.isManager || this.state.isManagerUI ? <a className="toolbar--manager-ui" href="#" onClick={e => (e.preventDefault(), this.parent.manager())}/> : null}
						{this.hasShare ? <a className="toolbar--share" href="#" onClick={e => (e.preventDefault(), this.shareCallback())}/> : null}
						{this.state.isManagerUI ? <a className="toolbar--render--setting" href="#" onClick={e => (e.preventDefault(), this.settings_form.showSettings())}/> : null}
						{this.state.query ? <a className="toolbar--search" href="#" onClick={e => (e.preventDefault(), this.query_form.showQuery())} /> : null}
						<a className="toolbar--logout" href="#" onClick={e => (e.preventDefault(), this.parent.logoutCallback(e))} />
					</div>
				</div>
				{this.state.isManagerUI ? <SettingsForm submitCallback={this.parent.settings} ref={settings => (this.settings_form = settings)}/> : null}
				{this.state.query ? <QueryForm query={this.parent.query} ref={query => (this.query_form = query)}/> : null}
				{this.hasShare ? <ShareForm ref={share => {this.share_form = share}}/> : null}
			</div>);
		}

		return (<div className="toolbar-container">
			<div className={this.state.toolbarState + "toolbar-view"}>
				{this.hasBack === true ? <a className="toolbar--back" href="#" onClick={e => (this.parent.backCallback(e))} /> : null}
				<div className="toolbar--title">
					{this.name}
				</div>
				<div className="toolbar--right-icons">
					{this.isManager ? <a className="toolbar--manager-ui" href="#" onClick={e => (e.preventDefault(), this.parent.manager())}/> : null}
					{this.state.isManagerUI ? <a className="toolbar--render--setting" href="#" onClick={e => (e.preventDefault())}/> : null}
					{this.hasShare ? <a className="toolbar--share" href="#" onClick={e => (e.preventDefault(), this.shareCallback(e))}/> : null}
					{this.state.query ? <a className="toolbar--search" href="#" onClick={e => (e.preventDefault(), this.query_form.showQuery())}/> : null}
					<a className="toolbar--logout" href="#" onClick={e => (e.preventDefault(), this.parent.logoutCallback(e))} />
				</div>
				{this.state.isManagerUI ? <SettingsForm submitCallback={this.parent.settings} ref={settings => (this.settings_form = settings)}/> : null}
				{this.state.query ? <QueryForm query={this.parent.query} ref={query => (this.query_form = query)}/> : null}
				{this.hasShare ? <ShareForm ref={share => {this.share_form = share}}/> : null}
			</div>
		</div>);
	}
}
