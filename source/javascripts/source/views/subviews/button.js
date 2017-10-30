import React from "../../../lib/react.js";

export default class Button extends React.Component {
	constructor(props) {
		super(props);

		this.wrapperClass = props.wrapperClass + "--button";
		this.type = props.type;
		this.title = props.title;
	}

	render() {
		return <div class={this.wrapperClass}>
			<button type={this.type} title={this.title} class={this.wrapperClass + ' button button--primary button--normal'}>
				<span>{this.title}</span>
			</button>
		</div>
	}
}