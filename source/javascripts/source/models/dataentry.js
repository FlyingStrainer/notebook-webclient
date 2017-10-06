
class DataEntry {
	constructor(text, image, caption, tags, author) {
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

	redactEntry() {

	}
}

module.exports =  DataEntry;
