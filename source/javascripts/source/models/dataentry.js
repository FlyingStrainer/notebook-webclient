
export default class DataEntry {
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

	constructor(uuid, json) {
		this.id = uuid;
		this.text = json.text;
		this.image = json.image;
		this.caption = json.caption;
		this.tags = json.tags;
		this.date_created = json.date_created;
		this.author = json.author;
		this.redacted = json.redacted;
	}

	getDate() {
        return this.date_created.getDate() + "/" + this.date_created.getMonth() + "/" + this.date_created.getFullYear() + ", " +
            this.date_created.getHours() + ":" + this.date_created.getMinutes() + ":" + this.date_created.getSeconds();
    }

	redactEntry() {

	}
}