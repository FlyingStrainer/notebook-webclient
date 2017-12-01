export default class User 
{
  constructor(json)
  {
    this.user_hash = json.user_hash;
    this.email = json.email;
    this.company_name = json.company_name;

    // Arrays
    this.permissions = json.permissions;
    this.notebooks = json.notebook_list;
  }
}
