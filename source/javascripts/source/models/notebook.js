export default class Notebook
{

	constructor(uuid, json)
	{
		if(uuid)
			this.notebook_hash = uuid;

		if(json)
		{
			this.name = json.name;
			this.managers = json.managers;
			this.tags = json.tags;
			this.settings = json.format;

			if(this.settings === undefined) {
				this.settings = { image : "below" }
			}

			this.calcDateCreated(json.date_created);
			this.calcDateModified(json.date_modified);
		}
	}

	calcDateCreated(date) {
        this.date_created_real = new Date(date);

        this.date_created = this.date_created_real.getDate() + "/" + (this.date_created_real.getMonth() + 1) + "/" + this.date_created_real.getFullYear() + ", " +
            this.date_created_real.getHours() + ":" + this.date_created_real.getMinutes() + ":" + this.date_created_real.getSeconds();
    }

    calcDateModified(date) {
        this.date_modified_real = new Date(date);

        this.date_modified = this.date_modified_real.getDate() + "/" + (this.date_modified_real.getMonth() + 1) + "/" + this.date_modified_real.getFullYear() + ", " +
            this.date_modified_real.getHours() + ":" + this.date_modified_real.getMinutes() + ":" + this.date_modified_real.getSeconds();
    }

}

