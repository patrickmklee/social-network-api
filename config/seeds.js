const db = require('./connection.js');
const {  User } = require('../models');
const userSeeds = [{
    "_id" : "1",
	"username": "username234",
	"password":"password",
	"email":"user2@email.com"
},
{
    "_id" : "2",
	"username": "username1234",
	"password":"password",
	"email":"user@email.com"
},
]


db.once('open', () => {
//   await Thought.deleteMany({});
  User.deleteMany({});
// A user has been created already for our activity purposes
  userSeeds.forEach( async function(user) {
   let dbUser =   await  db.User.create(user)
//   .then(dbUser => {
    console.log(dbUser);
//   })
//   .catch(({ message }) => {
    // console.log(message);
//   })

});
})