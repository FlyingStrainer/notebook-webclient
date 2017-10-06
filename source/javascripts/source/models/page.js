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
    var oP = "<p>";
    var cP = "</p>";
    var cDiv = "</div>";
    var ret = oDiv + oP + this.timestamp + cP + cDiv;
    return ret;
  }
}
