import * as form from "./form.js";
//import React from "./../../lib/react.js"; 
//import ReactDOM from "./../../lib/react-dom.js";
export * from "./form.js";
var rootObject;
const dataEntryForm = {
	init(root) {
		rootObject = root;
		ReactDOM.render(
			<div id="Title">
				<h1>DataEntry</h1>
				<script>console.log("Hi")</script>
				<script>addTextField()</script>
			</div>
			, root
		);
	}
};

function addTextField() {
	return <div>
		<h1>TextEntry</h1>
	</div>;
}

export default dataEntryForm;
