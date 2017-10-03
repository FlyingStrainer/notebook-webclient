export class Notebook 
{
  constructor( id, pages, creator, timestamp )
  {
    this.id = id;
    this.pages= pages;
    this.creator = creator;
    this.timestamp = timestamp;
  },
  getHTMLForNotebookSel()
  {
    return "<div class=\"notebookHolder\"><p>" + id + " </p></div>";
  }
}
