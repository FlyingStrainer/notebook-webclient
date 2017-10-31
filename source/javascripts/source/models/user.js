export default class User 
{
  constructor( uuid, user_hash, userName, permissions, dateAccountCreated, lastLogin)
  {
    this.uuid = uuid;
    this.user_hash = user_hash;
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
