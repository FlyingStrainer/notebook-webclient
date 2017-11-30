
export default class DataEntry {

	constructor(uuid, json) {
		if(uuid)
			this.entry_hash = uuid;

		if(json)
		{
			this.text = json.text;
			this.image = json.image;
			this.caption = json.caption;
			this.tags = json.tags;
			this.date_created = new Date(json.date_created);
			this.author_hash = json.author_hash;
			this.author = json.author;
			this.redacted = json.redacted;

			this.date_created = this.date_created.getDate() + "/" + this.date_created.getMonth() + "/" + this.date_created.getFullYear() + ", " +
                this.date_created.getHours() + ":" + this.date_created.getMinutes() + ":" + this.date_created.getSeconds();
		}
	}
}