import React from "../../../lib/react.js";
import TagsInput from "../../../lib/react-tagsinput.js";

import Button from "./button.js";

Date.prototype.monthDays = function(){
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
}

export default class QueryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { overlayState : "stateLoad ", queryState : "stateText ", tags : [], tag : "" };

        this.date1 = new Date();
        this.date2 = new Date();

        console.log(this.date1);

        this.showQuery = this.showQuery.bind(this);
        this.hideQuery = this.hideQuery.bind(this);
        this.validateSet = this.validateSet.bind(this);
        this.mode = this.mode.bind(this);
        this.query = this.query.bind(this);
    }

    showQuery() {
        this.setState({ overlayState : "stateShow " });
    }

    hideQuery() {
        this.textInput.value = "";
        this.setState({ overlayState : "stateHide ", tags : [], tag : "" });
    }

    mode(mode) {
        this.textInput.value = "";
        this.setState({ queryState : "state" + mode + " ", tags : [], tag : "" });
    }

    validateSet(min, max, target) {
        if(target.value < min)
            target.value = min;
        if(target.value > max)
            target.value = max;
    }

    query() {

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
                        <div className="query--timestamp">
                            <div className="timestamp--date"><input type="number" defaultValue={this.date1.getMonth() + 1} onChange={e => (this.validateSet(1, 12, e.target), this.date1.setMonth(e.target.value - 1), this.validateSet(1, this.date1.monthDays(), this.date1_days))}/></div>
                            <div className="timestamp--date"><input type="number" defaultValue={this.date1.getDate()} ref={days => (this.date1_days = days)} onChange={e => (this.validateSet(1, this.date1.monthDays(), e.target), this.date1.setDate(e.target.value))}/></div>
                            <div className="timestamp--date"><input type="number" defaultValue={this.date1.getFullYear() % 100} onChange={e => (this.validateSet(1, new Date().getFullYear() % 100, e.target), this.date1.setFullYear(2000 + e.target.value))}/></div>
                            <div className="timestamp--date"><input type="number" defaultValue={this.date1.getHours()} onChange={e => (this.validateSet(0, 23, e.target), this.date1.setHours(e.target.value))}/></div>
                            <div className="timestamp--date"><input type="number" defaultValue={this.date1.getMinutes()} onChange={e => (this.validateSet(0, 59, e.target), this.date1.setMinutes(e.target.value))}/></div>
                            <div className="timestamp--date"><input type="number" defaultValue={this.date1.getSeconds()} onChange={e => (this.validateSet(0, 59, e.target), this.date1.setSeconds(e.target.value))}/></div>
                        </div>
                        <div className="query--timestamp">
                            <div className="timestamp--date"><input type="number" defaultValue={this.date2.getMonth() + 1} onChange={e => (this.validateSet(1, 12, e.target), this.date2.setMonth(e.target.value - 1), this.validateSet(1, this.date2.monthDays(), this.date2_days))}/></div>
                            <div className="timestamp--date"><input type="number" defaultValue={this.date2.getDate()} ref={days => (this.date2_days = days)} onChange={e => (this.validateSet(1, this.date1.monthDays(), e.target), this.date2.setDate(e.target.value))}/></div>
                            <div className="timestamp--date"><input type="number" defaultValue={this.date2.getFullYear() % 100} onChange={e => (this.validateSet(1, new Date().getFullYear() % 100, e.target), this.date2.setFullYear(2000 + e.target.value))}/></div>
                            <div className="timestamp--date"><input type="number" defaultValue={this.date2.getHours()} onChange={e => (this.validateSet(0, 23, e.target), this.date2.setHours(e.target.value))}/></div>
                            <div className="timestamp--date"><input type="number" defaultValue={this.date2.getMinutes()} onChange={e => (this.validateSet(0, 59, e.target), this.date2.setMinutes(e.target.value))}/></div>
                            <div className="timestamp--date"><input type="number" defaultValue={this.date2.getSeconds()} onChange={e => (this.validateSet(0, 59, e.target), this.date2.setSeconds(e.target.value))}/></div>
                        </div>
                    </div>
                    <div className="query--tags">
                        <TagsInput name="Tags" value={this.state.tags} inputValue={this.state.tag} onChangeInput={e => (this.setState({ tag : e }))} onChange={e => (this.setState({ tags : e }))} />
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