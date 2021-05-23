const router = require('express').Router();
const { createUser, getAllUser, getUserById, deleteUser, updateUser, addFriend, getFriends, deleteFriend} = require('../../controllers/user-controller');

// /api/pizzas
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/pizzas/:id
router
  .route('/:userId')
  .get(getUserById)
  // .post(addFriend)
  .put(updateUser)
  .delete(deleteUser);



// /api/users/:id/friends
router
  .route('/:userId/friends/:friendId')
  // .get(get)
  .post(addFriend)
  .delete(deleteFriend);
module.exports = router;
