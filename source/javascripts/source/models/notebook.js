export default class Notebook 
{

  constructor(uuid, name, managers, date_created, date_modified, tags)
  {
    this.notebook_hash = uuid;
    this.name = name;
    this.managers = managers;
    this.dateCreated = date_created;
    this.dateModified = date_modified;
    this.tags = tags;
  }

  constructor(uuid, json)
  {
    this.notebook_hash = uuid;
    this.name = json.name;
    this.managers = json.managers;
    this.dateCreated = json.date_created;
    this.dateModified = json.date_modified;
    this.tags = json.tags;
  }

}

