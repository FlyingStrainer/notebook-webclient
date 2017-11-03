import User from "../models/user.js";

// Functions to serialize and deserialize json into model objects live here

function userFromJson( json )
{
    var userFromJson = JSON.parse(json);
      let user = Object.assign( new User, userFromJson );
        return user;
}

function userToJson( user )
{
     var jsonSerialized = JSON.stringify(user);
        return jsonSerialized;
}

function getUserWithHash( userHash )
{
  var myHeaders = new Headers();
  var userReqInit = { method: 'POST', headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              }, 
              body: JSON.stringify({
                user_hash : this.parent.getUser(),
                notebook_hash : this.parent.getCurrentNotebook().uuid
              }), 
  };

  // Since this is a promise you use getUserWithHash as follows
  // getUserWithHash( userhash ).then(function(user) { dosomething(); });

  return fetch("http://endor-vm1.cs.purdue.edu/getEntries", userReqInit).then(function(response) 
  {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Network respose was not ok.");
  })
  .then(function(jsonResponse) 
  {
    let user = userFromJson(jsonResponse);
  });
}
