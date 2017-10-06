import loginView from "./views/login.js";
import dataEntryForm from "./forms/dataentry.js";
import pages from "./views/pages.js";
var DataEntryForm = require("./forms/dataentry.js");

$(document).ready(function() {
	const body = $("body");
	if(body.hasClass("pageview"))
	{
		pages.init();
	}
	if(body.hasClass("dataEntryView"))
	{
//		dataEntryForm.init(document.getElementById("root"));
		const element = <DataEntryForm />;
		ReactDOM.render(
			element,
			document.getElementById("root")
		);
	}
	else
	{
		loginView.init();
	}
});
