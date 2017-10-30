export default class User 
{
  constructor( id, userHash, userName, permissions, dateAccountCreated, lastLogin)
  {
    this.id = id;
    this.userHash = userHash;
    this.userName = userName;
    this.permissions = permissions;
    this.dateAccountCreated = dateAccountCreated;
    this.lastLogin = lastLogin;
  }
}
