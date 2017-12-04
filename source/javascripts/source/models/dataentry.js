
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
			this.date_created_real = new Date(json.date_created);
			this.author_hash = json.author_hash;
			this.author = json.author;
			this.cosign_hash = json.cosign_hash;
			this.redacted = json.redacted;

			this.date_created = this.date_created_real.getDate() + "/" + (this.date_created_real.getMonth() + 1) + "/" + this.date_created_real.getFullYear() + ", " +
                this.date_created_real.getHours() + ":" + this.date_created_real.getMinutes() + ":" + this.date_created_real.getSeconds();
		}
	}
}
