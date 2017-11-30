import React from "../../../lib/react.js";

export default class Button extends React.Component {
	constructor(props) {
		super(props);

		this.wrapperClass = props.wrapperClass + "--button";
		this.type = props.type;
		this.title = props.title;
		this.onClick = props.onClick;
    this.dataIntro = props.dataIntro; 
    this.dataStep = props.dataStep;
	}

	render() {
    if (this.dataIntro && this.dataStep)
    {
      return <div data-intro={this.dataIntro} data-step={this.dataStep} className={this.props.wrapperClass + "--button"}>
        <button type={this.type} title={this.title} className={this.wrapperClass + ' button button--primary button--normal'} onClick={e => (e.preventDefault(), this.onClick(e))}>
          <span>{this.title}</span>
        </button>
      </div>
    }
    else
    {
      return <div className={this.props.wrapperClass + "--button"}>
        <button type={this.type} title={this.title} className={this.wrapperClass + ' button button--primary button--normal'} onClick={e => (e.preventDefault(), this.onClick(e))}>
          <span>{this.title}</span>
        </button>
      </div>
    }
	}
}
