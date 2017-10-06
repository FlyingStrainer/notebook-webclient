export default class Notebook 
{
  constructor( id, dataEntries, creator)
  {
    this.id = id;
    this.dataEntries = dataEntries;
    this.creator = creator;
    this.timestamp = new Date();
  }

  getHTMLForNotebookSel()
  {
    var oDivO = "<div id=\"";
    var oDivC = "\" class=\"notebookHolder\">";
    var oDiv = oDivO + "nb" + this.id + oDivC;
    var oP = "<p>";
    var cP = "</p>";
    var cDiv = "</div>";
    var ret = oDiv + oP + this.timestamp + cP + cDiv;
    return ret;
  }
}
