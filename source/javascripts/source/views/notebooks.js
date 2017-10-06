import pageView from "./pages.js";

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

	},

	transition() {

	}

};

export default notebookView;
