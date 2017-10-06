import loginView from "./views/login.js";
import pages from "./views/pages.js";
import DataEntryForm from "./forms/dataentry.js";

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
