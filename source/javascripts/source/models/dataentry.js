export default DataEntry;

class DataEntry {
	constructor(text, image, caption, author) {
		this.text = text;
		this.image = image;
		this.caption = caption;
		this.date_created = new Date();
		this.author = author;
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
