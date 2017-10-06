
class DataEntry {
	constructor(text, image, caption, tags, author) {
    this.id = "";
		this.text = text;
		this.image = image;
		this.caption = caption;
		this.tags = tags;
		this.date_created = new Date();
		this.author = author;
		this.redacted = false;
	}

	toJSON() {
		var json = '{'
			+ `"text": ${this.text}`
			+ `"image": ${this.image}`
			+ `"caption": ${this.caption}`
			+ `'date_created': ${this.date_created}`
			+ `"author_id": ${this.author.id}`
		+ '}';
		return json;
	}
	
	postEntry() {
		fetch('URL_PLACEHOLDER', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type' : 'application/json'
			},
			body: this.toJSON()
		});

	}

  getHTMLForEntrySel()
  {
    var oDivO = "<div id=\"";
    var oDivC = "\" class=\"pageView\">";
    var oDiv = oDivO + "entry" + this.id + oDivC;
    var oDelDivO = "<div id=\"";
    var oDelDivC = "\" class=\"delPageBtn\">";
    var oDelDiv = oDelDivO + "delEntry" + this.id + oDelDivC;
    var cDelDiv = "</div>";
    var oP = "<p>";
    var cP = "</p>";
    var cDiv = "</div>";
    var ret = oDiv + oDelDiv + oP + "x" + cP + cDelDiv + oP + this.text + cP + 
      oP + this.caption + cP + oP + this.author + cP + cDiv;
    return ret;
  }

	redactEntry() {

	}
}

module.exports =  DataEntry;
