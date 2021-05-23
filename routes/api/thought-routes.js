const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/comments/<pizzaId>
router.route('/')
.get(getThoughts);


// /api/comments/<pizzaId>/<commentId>
router
  .route('/:userId').post(addThought);

router
  .route('/:userId/:thoughtId')
  .get(getThoughtById);
router
  .route('/:userId/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeThought);



// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
