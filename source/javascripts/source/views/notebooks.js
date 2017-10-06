import pageView from "./pages.js";
import loginView from "./login.js";
import Notebook from "../models/notebook.js";
import NewNotebookForm from "../forms/createnotebook.js";

const notebookView = {

	init(initNotebooks) {
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
	    "<div id='overlay' style='position:absolute; top:50%; left:50%; width:0; height:0; background-color: rgba(0, 0, 0, 0.5); z-index:10; display:none'>" +
	    "<div id='root' style='position:absolute; top:20%; left: 20%; width: 60%; height:60%; background-color: white'></div>" +
	    "</div>" +
	    "</div>");

    body.append(content);

    content.show(500);

		const element = <NewNotebookForm />;
		ReactDOM.render(
			element,
			document.getElementById("root")
		);

		const overlay = $("#overlay");

    // Other init logic here

		console.log("HERE1");
    // Onclick Setup
    // Onclick for new notebook
    // Re add onclick for addnote
    $("#addNote").on("click", function(e)
    {
		console.log("HERE");
	    overlay.show();

	    overlay.animate({"top": "0%", "left": "0%", "width": "100%", "height": "100%"}, 150);

	    e.preventDefault();
      // alert("Creat new notebook");
      e.preventDefault();
    });

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
          pageView.init(notebooks, null);
        });
        e.preventDefault();
      });

      // add onclick for each notebook id is "bn" + id of notebook 
      notebooks.forEach( function (notebook)
      {
          var notebookId = "#nb" + notebook.id;

          $(notebookId).on("click", function(e, e1, e2)
          {
            // alert("notebook with id " + notebook.id);
			console.log($(this));
            body.find("#notebookMainView").hide(500, function() 
            {
              body.html('');
              pageView.init(notebooks, notebook.dataEntries);
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

    // initNotebooks are passed thorugh from another view calling init 
    // TODO delete test
    if (initNotebooks != null)
    {
      renderNotebooks(initNotebooks);
    }
    // testRenderNotebooks();

	},

	transition() {

	}

};

export default notebookView;
