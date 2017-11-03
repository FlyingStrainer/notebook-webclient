import DataEntry from "../models/dataentry.js";
import loginView from "./login.js";
import DataEntryForm from "../forms/dataentry.js";
import DeleteDataEntryForm from "../forms/deletedataentry.js";
import notebookView from "./notebooks.js";
import User from "../models/user.js";

import React from "../../lib/react.js";
import ToolbarView from "./subviews/toolbar.js";

//let dataEntries;
//let notebook;

export default class NotebookPagesView extends React.Component {

	constructor(props) {
		super(props);

		this.parent = props.parentHandler;

		this.state = {entriesList : [], close : false};

		this.pageListSearch = this.pageListSearch.bind(this);

		this.toggleNewEntry = this.toggleNewEntry.bind(this);

		this.back = this.back.bind(this);
		this.logout = this.logout.bind(this);

        this.parentToolbar = {searchHandler : this.pageListSearch, backCallback : this.back, logoutCallback : this.logout};
	}

	componentDidMount() {
        fetch("http://endor-vm1.cs.purdue.edu/getEntries", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
	            user_hash : this.parent.getUser(),
	            notebook_hash : this.parent.getCurrentNotebook().uuid
            })
        }).then(function(response) {
            if(response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        }).then(function(json) {
            json.data_entries.forEach(function(entry_uuid) {
            	console.log(entry_uuid);
                fetch("http://endor-vm1.cs.purdue.edu/getEntry", {
                    method: "POST",
                    headers: {
                        "Accept" : "application/json",
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
						user_hash : this.parent.getUser(),
                        notebook_hash : this.parent.getCurrentNotebook().uuid,
	                    entry_hash : entry_uuid
                    })
                }).then(function(response) {
                    if(response.ok) {
                        return response.json();
                    }
                    throw new Error("Network response was not ok.");
                }).then(function(json) {
                	console.log(json);
                    this.setState({entriesList : this.state.entriesList.concat(new DataEntry(json.text, json.image, json.caption, json.tags, json.author))});
                }.bind(this)).catch(function(error) {
					console.log(error.message);
                }.bind(this));
            }.bind(this));

        }.bind(this)).catch(function(error) {
            console.log(error.message);
        }.bind(this));
    }

	pageListSearch(event) {

    }

    toggleNewEntry() {

    }

    back(event) {
	    this.setState({entriesList : this.state.entriesList.slice(), close : true});

	    setTimeout(function(){
		    this.parent.back(event);
	    }.bind(this), 300);
    }

	logout(event) {
	    this.setState({entriesList : this.state.entriesList.slice(), close : true});

        setTimeout(function(){
            this.parent.logout(event);
        }.bind(this), 300);
    }

	render() {
		return <div className="pages">
			<ToolbarView page={this.parent.getCurrentNotebook().name} parentHandler={this.parentToolbar} visibile={this.state.close} hasBack={true} />
			<div className="list-view">
				<div className="notebooks--notebook notebooks--create-notebook" onClick={this.toggleNewEntry}>
					<div className="notebook--create-icon" />
				</div>
			</div>
			<div className="pages--selected-view">
				<PageView />
			</div>
		</div>
	}
}

class PageView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
        return (<div></div>);
	}
}

/*const pageView = {

	init(nb) {
		notebook = nb;
		dataEntries = notebook.dataEntries;
	},

	render( ) {
    const body = $("body");

    /*const content = $(
	    "<div class=\"mainView\" id=\"pageMainView\" style='display:none;'>" +
	    "<div class=\"topBarView\">" +
	    "<div id=\"titleHolder\">" +
	    "<h1 class=\"title\">Page View</h1>" +
	    "<h2 id=\"backBtn\" class=\"subtitle\">Go Back</h2>" +
	    "</div>" +
	    "<div id=\"logoutBtn\" class=\"topBarButton\">" +
	    "<p>Logout</p>" +
	    "</div>" +
	    "</div>" +

	    "<!-- This div holds all pages in notebook to let users select page open -->" +
	    "<div id=\"pageSelectorView\">" +
	    "<!-- This page should be clicked to make a new page --> " +
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
	     "</div>" +

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
	    "</div>");

    body.append(content);*

    content.show(500);


		const overlay = $("#overlay");
		const newDataEntry =$("#root");

    const dataEntryForm = <DataEntryForm cancelCallback={function() {
	    overlay.animate({"top": "50%", "left": "50%", "width": "0", "height": "0"}, 150, function() {$(this).hide()});
    }} submitCallback={function(dataEntry){
	    overlay.animate({"top": "50%", "left": "50%", "width": "0", "height": "0"}, 150, function() {$(this).hide()});
	    $("#pageSelectorView").append(dataEntry.getHTMLForEntrySel());

	    let content = "<h4>" + dataEntry.date_created + "</h4><p>" + dataEntry.text + "</p><img src='" + dataEntry.image + "' /><p>" + dataEntry.caption +"</p><p>" + dataEntry.author + "</p>"

	    $("#selectedPage").html('');
	    $("#selectedPage").append($(content));

		notebook.dataEntries.push(dataEntry);

	    var entryId = "#entry" + dataEntry.id;
	    $(entryId).on("click", function(e)
	    {
	    	console.log("here");
		    if(dataEntry.redacted === 1)
		    {
			    $("#selectedPage").attr("style", "background-color: gray");
		    }
		    else
			    $("#selectedPage").attr("style", "");

		    $("#selectedPage").html('');
		    $("#selectedPage").append($(content));
		    // You can manipulate entry in here
		    e.preventDefault();
	    });

	    var entryId = "#delEntry" + dataEntry.id;
	    $(entryId).on("click", function(e)
	    {

		    dataEntry.redacted = 1;

		    //deleteDataEntry.show();
		    //newDataEntry.hide();
		    //overlay.show();

		    //overlay.animate({"top": "0%", "left": "0%", "width": "100%", "height": "100%"}, 150);
		    //$(this).remove();

		    if (! e)
		    {
			    var e = window.event;
		    }

		    e.cancelBubble = true;

		    if (e.stopPropagation)
		    {
			    e.stopPropagation();
		    }
	    });
    }} />;

		ReactDOM.render(
			dataEntryForm,
			document.getElementById("root")
		);

    // Onclick setup

        $("button[type='submit']").on('click', function(e) {

        	newDataEntry.show();
			overlay.show();

			overlay.animate({"top": "0%", "left": "0%", "width": "100%", "height": "100%"}, 150);

        	e.preventDefault();
        });
   
    // Handle click for logout
    $("#logoutBtn").on("click", function(e, e1, e2)
    {
      body.find("#pageMainView").hide(500, function()
      {
        $(this).remove();
        loginView.init();
      });
      e.preventDefault();
    });

    // Handle click for back button
    // Re add onclick for addnote
    $("#backBtn").on("click", function(e, e1, e2)
    {
      // alert("backbtn");
	    notebookView.init();
      body.find("#pageMainView").hide(500, function()
      {
       $(this).remove();
        notebookView.render();
      });
      e.preventDefault();
    });

    // Functions
    // TODO delete test
    function testRenderDataToBar()
    {
      let nB = [new DataEntry("text1", "image1", "cap1", "tag1", "author"), new DataEntry("text2", "image2", "cap2", "tag2", "John Doe")];
      nB[0].id = "id1";
      nB[1].id = "id2";

      renderDataEntryToToolbar(nB);
    }

    // Given an array of notebook objects render them to notebook view
    function renderDataEntryToToolbar( data )
    {
      var htmlToRender = "";

      data.forEach( function (entry)
      {
        htmlToRender = htmlToRender + entry.getHTMLForEntrySel();
      });

      // Add html to innerHTML
      document.getElementById("pageSelectorView").innerHTML = htmlToRender;


      if(data.length > 0)
      {
	      $("#selectedPage").html('');
	      $("#selectedPage").append($("<h4>" + data[0].date_created + "</h4><p>" + data[0].text + "</p><img src='" + data[0].image + "' /><p>" + data[0].caption +"</p><p>" + data[0].author + "</p>"));


	      if(data[0].redacted === 1)
	      {
		      $("#selectedPage").attr("style", "background-color: gray");
	      }
	      else
		      $("#selectedPage").attr("style", "");
      }

      // add onclick for each data entry id is "entry" + id of entry
      data.forEach( function (entry)
      {
        var entryId = "#entry" + entry.id;
        $(entryId).on("click", function(e)
        {
        	console.log(entry);
        	if(entry.redacted === 1)
	        {
	        	$("#selectedPage").attr("style", "background-color: gray");
	        }
	        else
		        $("#selectedPage").attr("style", "");

        	$("#selectedPage").html('');
        	$("#selectedPage").append($("<h4>" + entry.date_created + "</h4><p>" + entry.text + "</p><img src='" + entry.image + "' /><p>" + entry.caption +"</p><p>" + entry.author + "</p>"));
          // You can manipulate entry in here
          e.preventDefault();
        });
      });

      // add onclick for each delete data entry id is "delEntry" + id of entry
      data.forEach( function (entry)
      {
        var entryId = "#delEntry" + entry.id;
        $(entryId).on("click", function(e, e1, e2)
        {

	        //deleteDataEntry.show();
	        //newDataEntry.hide();
	        //overlay.show();

	        //overlay.animate({"top": "0%", "left": "0%", "width": "100%", "height": "100%"}, 150);

	        entry.redacted = 1;

          if (!e)
          {
            var e = window.event;
          }

          e.cancelBubble = true;

          if (e.stopPropagation)
          {
            e.stopPropagation();
          }
        });
      });
    }

    // TODO delete test
    // Replace with the moc objects and call renderDataEntry
    // dEntries are entries pass from another place to page/data view
    if (dataEntries !== undefined)
    {
      renderDataEntryToToolbar(dataEntries);
    }
    // testRenderDataToBar();
},

	transition() {

	}

};

export default pageView;*/
