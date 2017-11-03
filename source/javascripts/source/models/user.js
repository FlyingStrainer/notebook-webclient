export default class User 
{
  constructor(user_hash, permissions, company_name, notebooks, roles)
  {
    this.user_hash = user_hash;
    this.company_name = company_name;

    // Arrays
    this.permissions = permissions;
    this.notebooks = notebooks;
    this.roles = roles;
  }
}
