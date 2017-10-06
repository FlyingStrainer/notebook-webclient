
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

	postEntry() {
		fetch('URL_PLACEHOLDER', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type' : 'application/json'
			},
			body: this
		});

	}

	redactEntry() {

	}
}

module.exports =  DataEntry;
