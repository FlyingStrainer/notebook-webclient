import React from "../../../lib/react.js";

export default class QueryView extends React.Component {
    constructor(props) {
        super(props);

        this.state = { queryState : "stateLoad " };
    }

    showQueryInput() {
        this.setState({ queryState : "stateShow " });
    }

    hideQueryInput() {
        this.setState({ queryState : "stateHide " });
    }

    render() {
        return <div className="query--input form-style">
            <form>
                <div className="form--text"><input type="text" placeholder="Query ..." /></div>
            </form>
        </div>
    }
}