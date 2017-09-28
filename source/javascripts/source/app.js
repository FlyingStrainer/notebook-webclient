import loginView from "./views/login.js";

import pages from "./views/pages.js";

$(document).ready(function() {
	const body = $("body");
	if(body.hasClass("pageview"))
	{
		pages.init();
	}
	else
	{
		loginView.init();
	}
});