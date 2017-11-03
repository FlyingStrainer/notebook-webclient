import loginView from "./views/login.js";
import pages from "./views/pages.js";
import { DataEntryForm } from "./forms/dataentry.js";
import { SignEntryForm } from "./forms/sign.js";
import { CosignEntryForm } from "./forms/cosign.js";

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
		console.log(element);
		ReactDOM.render(
			element,
			document.getElementById("root")
		);
	}
	else if (body.hasClass("signEntryView"))
	{
		console.log("sign");
		const element = <SignEntryForm />;
		console.log(element);
		ReactDOM.render(
			element,
			document.getElementById("root")
		);
	}
	else if (body.hasClass("cosignEntryView"))
	{
		console.log("cosign");
		const element = <CosignEntryForm />;
		console.log(element);
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
