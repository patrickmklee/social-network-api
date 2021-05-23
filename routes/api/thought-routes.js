const router = require('express').Router();
const {
  getThoughts,
  addThought,
  removeThought,
  getReactions,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/comments/<pizzaId>
router.route('/')
.get(getThoughts);

// router
//   .route('/:thoughtId')
//   .get(getReactions);

// /api/comments/<pizzaId>/<commentId>
router
  .route('/:userId/:thoughtId/reaction')
  .post(addReaction)
  .delete(removeThought);

router.route('/:userId').post(addThought);


// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
