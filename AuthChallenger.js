// Declare the function Auth Challenger that takes in one parameter, the users
require("dotenv").config(); 
const AuthChallenger = () => {
  // This will return True or False
  return async function(username, password, callback) {
  const knex = require("knex")({
    client: "postgresql",
    connection: {
      database: process.env.DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
  })
  try{
  let query = await knex.select('username')
  .from('users')
  .where('username', username)
  .where('password', password);
  console.log(query.length)
  if(query.length===1) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
} catch (err){
  console.log(err);
}
  };
};

module.exports = AuthChallenger;
