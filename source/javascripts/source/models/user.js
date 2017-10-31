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

  postUser() {
    fetch('PLACEHOLDER_URL', {
      method: "POST",
      header: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: this
    });
  }
}
