import React from "../../../lib/react.js";

export default class ToolbarView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div class="toolbar">
			<div class="toolbar--title">
				<h1>Page View</h1>
				<h2>Go Back</h2>
			</div>
			<div class="toolbar--logout">
				<p>Logout</p>
			</div>
		</div>
	}
}