import React from "../../../lib/react.js";

import QueryForm from "../forms/query.js";
import ShareForm from "../forms/share.js";

import * as Utils from "../../utils.js";

export default class ToolbarView extends React.Component {
	constructor(props) {
		super(props);

		this.parent = props.parentHandler;
		this.name = props.page;
		this.hasBack = props.hasBack;
		this.hasShare = props.hasShare;
		this.isManager = props.isManager;
		this.isManagerUI = props.isManagerUI;
		this.dataIntro = props.dataIntro;
		this.dataStep = props.dataStep;

		this.state = { toolbarState : (this.isManagerUI ? "" : "stateLoad "), query : props.query };

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

	componentWillReceiveProps(nextProps) {
		if(nextProps.visible !== this.props.visible)
			this.setState({ toolbarState : "stateExit stateTransition " });
		if(nextProps.query !== this.query) {
		    this.setState({ query : nextProps.query });
		    console.log("HERE");
        }
	}

	backup() {

    }

	shareCallback(event) {

		const errorFunc = function(error) {
			alert("error");
		}.bind(this);

		Utils.post("makePDF", { notebook_hash : this.parent.notebook_hash}, function(json) {

			setTimeout(function(){
				alert(json);
			}.bind(this), 300);

		}.bind(this), errorFunc);

		// prompt("Your share link -->", this.parent.notebook_hash);
	}

	render() {
		if(this.dataIntro && this.dataStep) {
            return (<div className="toolbar-container">
                <div data-intro={this.dataIntro} data-step={this.dataStep} className={this.state.toolbarState + "toolbar-view"}>
                    {this.hasBack === true ? <a className="toolbar--back" href="#" onClick={e => (this.parent.backCallback())} /> : null}
                    <div className="toolbar--title">
                        {this.name}
                    </div>
                    <div className="toolbar--right-icons">
                        {this.isManagerUI ? <a className="toolbar--back-up" href="#" onClick={e => (e.preventDefault(), this.backup)}/> : null}
                        {this.isManager || this.isManagerUI ? <a className="toolbar--manager-ui" href="#" onClick={e => (e.preventDefault(), this.parent.manager())}/> : null}
                        {this.hasShare ? <a className="toolbar--share" href="#" onClick={e => (e.preventDefault(), this.share_form.showShare())}/> : null}
                        {this.isManagerUI ? <a className="toolbar--render--setting" href="#" onClick={e => (e.preventDefault())}/> : null}
                        {this.state.query ? <a className="toolbar--search" href="#" onClick={e => (e.preventDefault(), this.query_form.showQuery())} /> : null}
                        <a className="toolbar--logout" href="#" onClick={e => (e.preventDefault(), this.parent.logoutCallback(e))} />
                    </div>
                </div>
                {this.state.query ? <QueryForm ref={query => (this.query_form = query)}/> : null}
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
                    {this.isManager ? <a className="toolbar--manager-ui" href="#" onClick={e => (e.preventDefault(), this.manager)}/> : null}
                    {this.isManagerUI ? <a className="toolbar--render--setting" href="#" onClick={e => (e.preventDefault())}/> : null}
                    {this.hasShare ? <a className="toolbar--share" href="#" onClick={e => (e.preventDefault(), this.share_form.showShare())}/> : null}
                    {this.state.query ? <a className="toolbar--search" href="#" onClick={e => (e.preventDefault(), this.query_form.showQuery())}/> : null}
                    <a className="toolbar--logout" href="#" onClick={e => (e.preventDefault(), this.parent.logoutCallback(e))} />
                </div>
                {this.state.query ? <QueryForm ref={query => (this.query_form = query)}/> : null}
                {this.hasShare ? <ShareForm ref={share => {this.share_form = share}}/> : null}
            </div>
        </div>);
	}
}
