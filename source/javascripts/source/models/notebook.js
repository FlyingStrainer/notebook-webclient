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
			this.dateCreated = json.date_created;
			this.dateModified = json.date_modified;
			this.tags = json.tags;
		}
	}

}

