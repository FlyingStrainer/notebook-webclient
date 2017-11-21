import React from "../../lib/react.js";
import * as DataEntry from "./dataentry.js";
import Button from "../views/subviews/button"

export default class ReviewEntryForm extends React.Component {
    constructor(props) {
        super(props);

        this.user = props.user;

        this.permissions = props.permissions;

        this.deleteCallback = props.deleteCallback;
        this.cosignCallback = props.cosignCallback;

        this.state = {entry : undefined};
    }

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);

		this.setState({entry : nextProps.entry});
	}

    render() {
        return (<form>
            {this.state.entry === undefined ? null :
                <div>
                    <div className="data-entry--background">
                        <h3 className="data-entry--author">{this.state.entry.author}</h3>
                        <h4 className="data-entry--date">{this.state.entry.getDate()}</h4>
                        <p>{this.state.entry.text}</p>
                        <img className="data-entry--image" src={this.state.entry.image} />
                        <p className="data-entry--caption">{this.state.entry.caption}</p>
                    </div>
                    {this.permissions.manager ? <div className="form--half"><Button wrapperClass="cosign" type="submit" title="Cosign" onClick={e => (this.cosignCallback(this.entry, "cosign"))} /></div> : null}
                    {this.permissions.write && this.user.user_hash === this.state.entry.author ?
                        <div className="form--half"><Button wrapperClass="delete" type="submit" title="Delete" onClick={e => (this.deleteCallback(this.entry, "delete"))} /></div> : null}
                </div>}
        </form>);
    }
}