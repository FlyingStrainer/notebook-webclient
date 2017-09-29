import * as form from "./form.js";
//import React from "./../../lib/react.js"; 
//import ReactDOM from "./../../lib/react-dom.js";
export * from "./form.js";

const dataEntryForm = {
	init(root) {
		ReactDOM.render(
			<div>
				<h1>Hello</h1>
				<script>console.log("Hi")</script>
			</div>
		, root
		);
		console.log("Hi");
	}
};

export default dataEntryForm;
