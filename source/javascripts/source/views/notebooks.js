import pageView from "./pages.js";
import Notebook from "../models/notebook.js";

const notebookView = {

	init() {
    const body = $("body");

    body.append($(
          "<div class=\"mainView\" id=\"notebookMainView\">" +
            "<div class=\"topBarView\">" +
              "<div id=\"titleHolder\">" +
                "<h1 class=\"title\">Our Title</h1>" +
                "<h2 class=\"subtitle\">subtitle(Maybe users name)/org</h2>" +
              "</div>" +
              "<div id=\"logoutBtn\" class=\"topBarButton\">" +
                "<p>Logout</p>" +
              "</div>" +
            "</div>" +

            "<!-- This is the div that will hold all the modules relating to editing, deleting, sharing notebooks -->" +

            "<div class=\"toolsView\" id=\"notebookToolsView\">" +
              "<div class=\"notebookTool\" id=\"sharePage\">" +
                "<p> tool #1 </p>" +
              "</div>" +

              "<div class=\"notebookTool\" id=\"deleteNotebook\">" +
                "<p> tool #2 </p>" +
              "</div>" +

              "<div class=\"notebookTool\" id=\"newNotebook\">" +
                "<p> tool #3 </p>" +
              "</div>" +

            "</div>" +

            "<!-- This is the div that will hold all notebooks user has access to -->" +
            "<div id=\"notebookSelectorView\">" +
            "<!-- this contents will be populated dynamically with js to show divs that hold all notebook -->" +
            "<div id=\"addNote\" class=\"notebookHolder\">" +
              "<p> CREATE NEW NOTEBOOK </p>" +
            "</div>" +
          "</div>" +
        "</div>"));

    // Other init logic here

    // Onclick Setup

    // Handle click for new notebook creation
    $("#addNote").on("click", function(e, e1, e2) 
    {
      // alert("Creat new notebook"); 
      body.find("#notebookMainView").hide(500, function() 
      {
        body.html('');
        pageView.init();
      })
      e.preventDefault();
    });

    // Handle click for logout
    $("#logoutBtn").on("click", function(e, e1, e2) 
    {
      alert("Logout"); 
      e.preventDefault();
    });

    // Functions
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
        })
        e.preventDefault();
      });
    }

    // Get html for the create notebook notebook
    function getHTMLForCreateNotebook()
    {
      return "<div id=\"addNote\" class=\"notebookHolder\"><p> CREATE NEW NOTEBOOK </p></div>";
    }

    testRenderNotebooks();

	},

	transition() {

	}

};

export default notebookView;
