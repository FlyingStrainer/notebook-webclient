export default class Page 
{
  constructor( dataEntry, timestamp, id )
  {
    this.timestamp = timestamp;
    this.dataEntry = dataEntry;
    this.id = id;
  }

  getHTMLForPageSel()
  {
    var oDivO = "<div id=\"";
    var oDivC = "\" class=\"pageView\">";
    var oDiv = oDivO + "page" + this.id + oDivC;
    var oDelDivO = "<div id=\"";
    var oDelDivC = "\" class=\"delPageBtn\">";
    var oDelDiv = oDelDivO + "delPage" + this.id + oDelDivC;
    var cDelDiv = "</div>";
    var oP = "<p>";
    var cP = "</p>";
    var cDiv = "</div>";
    var ret = oDiv + oDelDiv + oP + "x" + cP + cDelDiv + oP + this.timestamp + cP + cDiv;
    return ret;
  }
}
