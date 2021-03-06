const { Thought, User } = require('../models');

const thoughtController = {
    // get all users
    getThoughts(req, res) {
      Thought.find({})
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .populate({
          path: 'users',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
    getThoughtById({params}, res) {
      console.log(params.thoughtId, params.userId)
      Thought.findOne({_id: params.thoughtId })
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .populate({
          path: 'users',
          select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  // add thought to user
  addThought({ params, body }, res) {
    console.log(params);
    // const user = User.findById()
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators:true }
        );
      })
      .then(dbUserData => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // add reply to thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { thoughtId: params.thoughtId },
      { $push: { reactions: body } },
      { new: false, runValidators: true })
    .populate({
      path: 'reactions',
      select: '-__v'
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData)
      })
    
      // .then(dbUserData => {
      //   if (!dbUserData) {
      //     res.status(404).json({ message: 'No user found with this id!' });
      //     return;
      //   }
      //   res.json(dbUserData);
      // })
      .catch(err => res.json(err));
  },

  // remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // remove reply
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
