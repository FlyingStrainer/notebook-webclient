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
