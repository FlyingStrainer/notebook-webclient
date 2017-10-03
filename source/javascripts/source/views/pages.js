const pageView = {

	init() {
    const body = $("body");
    body.append($(
      "<div class=\"mainView\" id=\"pageMainView\">" +
        "<div class=\"topBarView\">" +
          "<div id=\"titleHolder\">" +
            "<h1 class=\"title\">Our Title</h1>" +
            "<h2 class=\"subtitle\">subtitle(Maybe users name)/org</h2>" +
          "</div>" +
          "<div class=\"topBarButton\">" +
            "<p>Logout</p>" +
          "</div>" +
        "</div>" +

        "<!-- This div holds all pages in notebook to let users select page open -->" +
        "<div id=\"pageSelectorView\">" +
          "<!-- This page should be clicked to make a new page --> " +
          "<div class=\"pageView\" id=\"newPageView\">" +
            "<p>New Page</p>" + 
          "<div class=\"pageView\">" +
            "<p>Page 1</p>" +
            "<p>Meta Data?</p>" +
          "<div class=\"pageView\">" +
            "<p>Page 2</p>" +
            "<p>Meta Data?</p>" +
          "</div>" +
        "</div>" +

        "!-- This is the div that will hold all the modules relating to edting pages -->" +
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
        "</div>" +

        "<!-- This div holds a view for looking at a current page and/or rendering -->" +
        "<div id=\"currentPageView\">" +
          "<!-- this view will be dynalically populated through js to show the currently selected page -->" +
          "<div id=\"selectedPage\">" +

          "</div>" +
        "</div>" +
      "</div>"));
	},

	transition() {

	}

};

export default pageView;
