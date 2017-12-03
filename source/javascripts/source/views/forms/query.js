import React from "../../../lib/react.js";
import TagsInput from "../../../lib/react-tagsinput.js";
import DatePicker from "react-date-picker/build/entry.nostyle";

import Button from "./button.js";

export default class QueryForm extends React.Component {
    constructor(props) {
        super(props);

        this.queryHandler = props.query;

        this.state = { overlayState : "stateLoad ", queryState : "stateText ", tags : [], tag : "", date1 : new Date(), date2 : new Date() };

        this.showQuery = this.showQuery.bind(this);
        this.hideQuery = this.hideQuery.bind(this);
        this.mode = this.mode.bind(this);
        this.query = this.query.bind(this);
    }

    showQuery() {
        this.setState({ overlayState : "stateShow " });
    }

    hideQuery() {
        this.textInput.value = "";
        this.setState({ overlayState : "stateHide ", tags : [], tag : "", date1 : new Date(), date2 : new Date() });
    }

    mode(mode) {
        this.textInput.value = "";
        this.setState({ queryState : "state" + mode + " ", tags : [], tag : "", date1 : new Date(), date2 : new Date() });
    }

    query() {
        this.queryHandler(this.state.queryState, this.textInput.value, this.date1, this.date2, this.state.tags, this.state.tag);
        this.hideQuery();
    }

    render() {
        return (<div className="query-form">
            <div className={this.state.overlayState + "overlay"} onClick={this.hideQuery} />
            <div className={this.state.overlayState + this.state.queryState + "overlay--form overlay--query form-style"}>
                <form>
                    <div className="form--textarea">
                        <textarea placeholder="Text ..." ref={(input) => ( this.textInput = input )}/>
                    </div>

                    <div className="query--timestamps">
                        <DatePicker value={this.state.date1} onChange={date => {
                            this.setState({ date1 : date });
                            this.date_picker_2.minDate = this.state.date1;
                        }} ref={date => this.date_picker_1 = date}/>
                        <DatePicker value={this.state.date2} onChange={date => {
                            this.setState({ date2 : date });
                            this.date_picker_1.maxDate = date;
                        }} ref={date => this.date_picker_2 = date}/>
                    </div>

                    <div className="query--tags">
                        <TagsInput onlyUnique={true} maxTags={4} addOnPaste={true} value={this.state.tags} inputValue={this.state.tag} onChangeInput={e => (this.setState({ tag : e }))} onChange={e => (this.setState({ tags : e }))} />
                    </div>

                    <div className="query--button-list">
                        <Button wrapperClass="query-text" type="button" title="By Text" onClick={() => (this.mode("Text"))} />
                        <Button wrapperClass="query-timestamp" type="button" title="By Dates" onClick={() => (this.mode("Timestamp"))} />
                        <Button wrapperClass="query-tag" type="button" title="By Tags" onClick={() => (this.mode("Tag"))} />
                    </div>
                    <Button wrapperClass="form--submit" type="submit" title="Query" onClick={this.query}/>
                </form>
            </div>
        </div>);
    }
}