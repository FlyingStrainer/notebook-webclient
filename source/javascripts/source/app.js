import loginView from "./views/login.js";
import pages from "./views/pages.js";
import DataEntryForm from "./forms/dataentry.js";
import signEntryForm from "./forms/sign.js";



$(document).ready(function() {
	const body = $("body");
	if(body.hasClass("pageview"))
	{
		pages.init();
	}
	else if(body.hasClass("dataEntryView"))
	{
		console.log("data");
//		dataEntryForm.init(document.getElementById("root"));
		var cancel = function() {
			console.log("Cancel");
		}		

		var submit = function(dataEntry) {
			console.log("Submit: " + dataEntry.text);
		}		

		const element = <DataEntryForm cancelCallback={cancel} submitCallback={submit} />;
		ReactDOM.render(
			element,
			document.getElementById("root")
		);
	}
	else if (body.hasClass("signEntryView"))
	{
		console.log("sign");
		const element = <signEntryForm.SignEntryForm />;
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
