import React from "../../../lib/react.js";

import Button from "./button.js";

export default class QueryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { overlayState : "stateLoad " };

        this.showQuery = this.showQuery.bind(this);
        this.hideQuery = this.hideQuery.bind(this);
        this.query = this.query.bind(this);
    }

    showQuery() {
        this.setState({ overlayState : "stateShow " });
    }

    hideQuery() {
        this.setState({ overlayState : "stateHide " });
    }

    query() {

    }

    render() {
        return (<div className="query-form">
            <div className={this.state.overlayState + "overlay"} onClick={this.hideQuery} />
            <div className={this.state.overlayState + "overlay--query form-style"}>
                <form>
                    <div className="form--textarea">
                        <textarea placeholder="Query ..." ref={(input) => ( this.textInput = input )}/>
                    </div>
                    <Button wrapperClass="form--submit" type="submit" title="Query" onClick={this.query}/>
                </form>
            </div>
        </div>);
    }
}