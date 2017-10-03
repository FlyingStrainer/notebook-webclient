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
				{addTextField()}
			</div>
			, root
		);
	}
};

export function addTextField() {
	return <form>
		Describe your work:<br />
		<input type="text" style="width: 300px; height: 200px;"/><br /><br />
		Include an image:<br />
		<input type="file" /><br /><br />
		Caption the image:<br />
		<input type="text" /><br /><br />

		<input type="submit" /><br /><br />
	</form>;
}

export default dataEntryForm;
