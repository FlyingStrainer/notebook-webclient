import DataEntry from "../models/dataentry.js";
import pageView from "./pages.js";
import loginView from "./login.js";
import Notebook from "../models/notebook.js";

const notebookView = {

	init() {
    const body = $("body");

    const content = $(
	    "<div class=\"mainView\" id=\"notebookMainView\" style='display:none'>" +
	    "<div class=\"topBarView\">" +
	    "<div id=\"titleHolder\">" +
	    "<h1 class=\"title\">Venote</h1>" +
	    "<h2 class=\"subtitle\">View Notebooks</h2>" +
	    "</div>" +
	    "<div id=\"logoutBtn\" class=\"topBarButton\">" +
	    "<p>Logout</p>" +
	    "</div>" +
	    "</div>" +

	    "<!-- This is the div that will hold all notebooks user has access to -->" +
	    "<div id=\"notebookSelectorView\">" +
	    "<!-- this contents will be populated dynamically with js to show divs that hold all notebook -->" +
	    "<div id=\"addNote\" class=\"notebookHolder\">" +
	    "<p> CREATE NEW NOTEBOOK </p>" +
	    "</div>" +
	    "</div>" +
	    "</div>");

    body.append(content);

    content.show(500);

    // Other init logic here

    // Onclick Setup

    // Handle click for logout
    $("#logoutBtn").on("click", function(e, e1, e2) 
    {
      body.find("#notebookMainView").hide(500, function()
      {
        body.html('');
        loginView.init();
      });

      e.preventDefault();
    });

    // Functions

    // TODO delete test
    function testRenderNotebooks() 
    {
      let nB = [new Notebook(), new Notebook()];
      nB[0].id = "1234";
      nB[0].pages = "test";
      nB[0].creator = "create";
      nB[0].timestamp = "123";
      nB[1].id = "543";
      nB[1].pages = "test1";
      nB[1].creator = "Chad";
      nB[1].timestamp = "874";

      renderNotebooks(nB);
    }

    // Given an array of notebook objects render them to notebook view
    function renderNotebooks( notebooks )
    {
      // Get a string which will be html for all notebooks starting with create
      var htmlToRender = getHTMLForCreateNotebook();
      notebooks.forEach( function (notebook)
      {
        htmlToRender = htmlToRender + notebook.getHTMLForNotebookSel(); 
      });

      // Add html to innerHTML
      document.getElementById("notebookSelectorView").innerHTML = htmlToRender;

      // Re add onclick for addnote
      $("#addNote").on("click", function(e, e1, e2) 
      {
        // alert("Creat new notebook"); 
        body.find("#notebookMainView").hide(500, function() 
        {
          body.html('');
          pageView.init();
        });
        e.preventDefault();
      });

      // TODO change this to mock data
      let nB = [new DataEntry("text1", "image1", "cap1", "tag1", "author"), new DataEntry("text2", "image2", "cap2", "tag2", "John Doe")];
      nB[0].id = "id1";
      nB[1].id = "id2";

      // add onclick for each notebook id is "bn" + id of notebook 
      notebooks.forEach( function (notebook)
      {
          var notebookId = "#nb" + notebook.id;

          // TODO Eeach of these notebooks should have different data entry
          notebook.dataEntries = nB;

          $(notebookId).on("click", function(e, e1, e2)
          {
            // alert("notebook with id " + notebook.id);

            body.find("#notebookMainView").hide(500, function() 
            {
              body.html('');
              pageView.init(notebook.dataEntries);
            });
            e.preventDefault();
          });
      });

    }

    // Get html for the create notebook notebook
    function getHTMLForCreateNotebook()
    {
      return "<div id=\"addNote\" class=\"notebookHolder\"><p> CREATE NEW NOTEBOOK </p></div>";
    }

    // TODO delete test
    testRenderNotebooks();

	},

	transition() {

	}

};

export default notebookView;
