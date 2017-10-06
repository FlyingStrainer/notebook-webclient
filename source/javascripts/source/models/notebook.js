export default class Notebook 
{
  constructor(name, id, dataEntries, creator)
  {
    this.name = name;
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
    var ret = oDiv + oP + this.name + cP + oP + this.timestamp + cP + cDiv;
    return ret;
  }

  postNotebook() {
    fetch('PLACEHOLDER_URL', {
      method: "POST",
      header: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: this
    });
  }

}

