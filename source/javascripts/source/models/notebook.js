export default class Notebook 
{
  constructor( id, pages, creator, timestamp )
  {
    this.id = id;
    this.pages = pages;
    this.creator = creator;
    this.timestamp = timestamp;
  }

  getHTMLForNotebookSel()
  {
    var oDiv = "<div class=\"notebookHolder\">";
    var oP = "<p>";
    var cP = "</p>";
    var cDiv = "</div>";
    var ret = oDiv + oP + this.timestamp + cP + cDiv;
    return ret;
  }
}
