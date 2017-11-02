import React from "../../lib/react.js";
import ToolbarView from "./subviews/toolbar";
import Notebook from "../models/notebook.js";

export default class NotebooksView extends React.Component {
	constructor(props) {
		super(props);

		this.user = props.user;
		this.getNotebooks = props.getNotebooks;
		this.setNotebooks = props.setNotebooks;


		this.state = {notebookList : ""};
	}

	componentDidMount() {
		if(this.getNotebooks() === undefined)
		{
			fetch("http://endor-vm1.cs.purdue.edu/getnotebooks", {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: {
					"user_hash" : this.user()
				}
			}).then(function(response) {
				if(response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok.");
			}).then(function(json) {
				console.log(json);

				let notebookCount = json.notebooks.length;
				let notebooks = [];

				json.notebooks.forEach(function(notebook_uuid) {
					fetch("http://endor-vm1.cs.purdue.edu/getnotebook", {
						method: "POST",
						headers: {
							"Accept" : "application/json",
							"Content-Type" : "application/json"
						},
						body: {
							"notebook_uuid" : notebook_uuid
						}
					}).then(function(response) {
						if(response.ok) {
							return response.json();
						}
						throw new Error("Network response was not ok.");
					}).then(function(json) {
						console.log(json);

						notebooks.push(new Notebook(notebook_uuid, json.name, json.managers, json.date_created, json.date_modified, json.permissions, json.tags));

						notebookCount--;
						if(notebookCount === 0)
						{
							this.setNotebooks(notebooks);
						}
					}.bind(this)).catch(function(error) {

					}.bind(this));
				});

			}.bind(this)).catch(function(error) {
				console.log(error.message);
			}.bind(this));
		}
		else
		{
			this.setState({notebookList : this.getNotebooks()});
		}
	}

	render() {
		return (<div class="notebooks-view">
			<ToolbarView />
			<div class="notebooks--list-view">
				<NotebookListView notebooks={this.state.notebookList}/>
			</div>
		</div>);
	}
}

class NotebookListView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div></div>);
	}
}

class NotebookView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

	}
}

/*const notebookView = {

	init() {

		if(notebooks === undefined)
		{
			notebooks = [];
			console.log("HERE");
		}

		/*$.get("http://endor-vm1.cs.purdue.edu/", {"msgType" : "getNotebooks"}, function(data) {
			console.log(data);
		});*

	},

	render() {
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
		const overlay = $("#overlay");

    content.show(500);

		const element = <CreateNotebookForm cancelCallback={function() {
			overlay.animate({"top": "50%", "left": "50%", "width": "0", "height": "0"}, 150, function() {$(this).hide()});
		}} submitCallback={function(notebook){
			overlay.animate({"top": "50%", "left": "50%", "width": "0", "height": "0"}, 150, function() {$(this).hide()});

			notebooks.push(notebook);

			pageView.init(notebook);
			body.find("#notebookMainView").hide(500, function()
			{
				$(this).remove();
				pageView.render();
			});

		}} />;
		ReactDOM.render(
			element,
			document.getElementById("root")
		);

    // Other init logic here

    // Onclick Setup
    // Onclick for new notebook
    // Re add onclick for addnot

		// Re add onclick for addnote
		$("#addNote").on("click", function(e)
		{
			console.log(overlay);
			overlay.show();

			overlay.animate({"top": "0%", "left": "0%", "width": "100%", "height": "100%"}, 150);
			// alert("Creat new notebook");
			/*body.find("#notebookMainView").hide(500, function()
			 {
			 body.html('');
			 pageView.init(notebooks, null);
			 });*
			e.preventDefault();
		});

    // Handle click for logout
    $("#logoutBtn").on("click", function(e)
    {
      body.find("#notebookMainView").hide(500, function()
      {
        $(this).remove();
        loginView.init();
      });

      e.preventDefault();
    });

    // Functions

    // TODO delete test
    function testRenderNotebooks() 
    {
      let nB = [new Notebook(), new Notebook()];
      notebooks[0].id = "1234";
      notebooks[0].pages = "test";
      notebooks[0].creator = "create";
      notebooks[0].timestamp = "123";
      notebooks[1].id = "543";
      notebooks[1].pages = "test1";
      notebooks[1].creator = "Chad";
      notebooks[1].timestamp = "874";

      renderNotebooks(notebooks);
    }

    // Given an array of notebook objects render them to notebook view
    function renderNotebooks()
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
	      overlay.show();

	      overlay.animate({"top": "0%", "left": "0%", "width": "100%", "height": "100%"}, 150);
        // alert("Creat new notebook");
        /*body.find("#notebookMainView").hide(500, function()
        {
          body.html('');
          pageView.init(notebooks, null);
        });*
        e.preventDefault();
      });

      // add onclick for each notebook id is "bn" + id of notebook 
      notebooks.forEach( function (notebook)
      {
          var notebookId = "#nb" + notebook.id;

          $(notebookId).on("click", function(e, e1, e2)
          {
            // alert("notebook with id " + notebook.id);
	          console.log(notebook.dataEntries);
	          pageView.init(notebook);
	          body.find("#notebookMainView").hide(500, function()
	          {
		         $(this).remove();
		          pageView.render();
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
    if (notebooks != null)
    {
      renderNotebooks();
    }
    // testRenderNotebooks();

	},

	transition() {

	}

};*/

//export default notebookView;
