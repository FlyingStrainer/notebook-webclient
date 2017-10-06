import notebookView from "./notebooks.js";
import DataEntry from "../forms/dataentry.js";
import Page from "../models/page.js";

const pageView = {

	init() {
    const body = $("body");
    body.append($(
      "<div class=\"mainView\" id=\"pageMainView\">" +
        "<div class=\"topBarView\">" +
          "<div id=\"titleHolder\">" +
            "<h1 class=\"title\">Page View</h1>" +
            "<h2 id=\"backBtn\" class=\"subtitle\">Go Back</h2>" +
          "</div>" +
          "<div class=\"topBarButton\">" +
            "<p>Logout</p>" +
          "</div>" +
        "</div>" +

        "<!-- This div holds all pages in notebook to let users select page open -->" +
        "<div id=\"pageSelectorView\">" +
          "<!-- This page should be clicked to make a new page --> " +
          "<div class=\"pageView\">" +
            "<p>Page 1</p>" +
            "<p>Meta Data?</p>" +
          "</div>" +
          "<div class=\"pageView\">" +
            "<p>Page 2</p>" +
            "<p>Meta Data?</p>" +
          "</div>" +
        "</div>" +

        /*"!-- This is the div that will hold all the modules relating to edting pages -->" +
        "<div class=\"toolsView\" id=\"pageTools\">" +
          "<!-- Sign pages -->" +
          "<div class=\"notebookTool\" id=\"signPage\">" +
            "<p>Sign Page</p>" +
          "</div>" +

          "<div class=\"notebookTool\">" +
            "<p>Tool 2</p>" +
          "</div>" +

          "<div class=\"notebookTool\">" +
            "<p>Tool 3</p>" +
          "</div>" +

          "<div class=\"notebookTool\">" +
            "<p>Tool 4</p>" +
          "</div>" +

          "<div class=\"notebookTool\">" +
            "<p>Tool 5</p>" +
          "</div>" +
        "</div>" + */

        "<!-- This div holds a view for looking at a current page and/or rendering -->" +
        "<div id=\"currentPageView\">" +
          "<!-- this view will be dynalically populated through js to show the currently selected page -->" +
          "<div id=\"selectedPage\">" +

          "</div>" +
        "</div>" +
        "<button type='submit' title='New Data Entry' class='register button button--primary button--normal' style='position:absolute; bottom: 100px; width: 200px; height: 60px; left: 50%'>" +
          "<span>New Data Entry</span>" +
        "</button>" +
        "<div id='overlay' style='position:absolute; top:50%; left:50%; width:0; height:0; background-color: rgba(0, 0, 0, 0.5); z-index:10; display:none'>" +
          "<div id='root' style='position:absolute; top:20%; left: 20%; width: 60%; height:60%; background-color: white'></div>" +
        "</div>" +
      "</div>"));

    // Onclick setup

		const overlay = $("#overlay");

		console.log(overlay);

        $("button[type='submit']").on('click', function(e) {
			overlay.show();

			overlay.animate({"top": "0%", "left": "0%", "width": "100%", "height": "100%"}, 150);

        	e.preventDefault();
        });
   
    // Handle click for logout
    $("#logoutBtn").on("click", function(e, e1, e2)
    {
      alert("Logout");
      e.preventDefault();
    });

    // Handle click for back button
    // Re add onclick for addnote
    $("#backBtn").on("click", function(e, e1, e2)
    {
      // alert("backbtn");
      body.find("#pageMainView").hide(500, function()
      {
        body.html('');
        notebookView.init();
      });
      e.preventDefault();
    });

    // Functions
    // TODO delete test
    function testRenderPagesToBar()
    {
      let nB = [new Page(), new Page()];
      nB[0].dataEntry = "test1";
      nB[0].timestamp = "june 3";
      nB[0].id = "1234";
      nB[1].dataEntry = "test2";
      nB[1].timestamp = "april 6";
      nB[1].id = "2243";

      renderPagesToToolbar(nB);
    }

    // Given an array of notebook objects render them to notebook view
    function renderPagesToToolbar( pages )
    {
      var htmlToRender = "";

      pages.forEach( function (page)
      {
        htmlToRender = htmlToRender + page.getHTMLForPageSel();
      });

      // Add html to innerHTML
      document.getElementById("pageSelectorView").innerHTML = htmlToRender;

      // add onclick for each page id is "page" + id of page 
      pages.forEach( function (page)
      {
        var pageId = "#page" + page.id;
        $(pageId).on("click", function(e, e1, e2)
        {
          alert("Page with id " + page.id);
          e.preventDefault();
        });
      });
    }

    // TODO delete test
    testRenderPagesToBar();
},

transition() {

}

};

export default pageView;
