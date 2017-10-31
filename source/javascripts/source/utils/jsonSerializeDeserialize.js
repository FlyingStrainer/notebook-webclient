// Functions to serialize and deserialize json into model objects live here

function userFromJson( json )
{

}

function userToJson( user )
{
   var jsonSerialized = JSON.stringify(user);
   return jsonSerialized;
}
