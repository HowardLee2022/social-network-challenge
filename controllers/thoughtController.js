const { Thoughts, User } = require('../models');

module.exports = {
  // Get all courses
  getThought(req, res) {
    Thoughts.find()
      .then((Thoughts) => res.json(Thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },



//Create a thought
  createThought(req, res) {
    Thoughts.create(req.body)
        .then((thoughts) => {
            return User.findOneAndUpdate(
                { username: thoughts.username },
                { $addToSet: { thoughts: thoughts._id } },
                { new: true }
            );
        })
        .then((user) =>
            !user
                ? res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                })
                : res.json('Created the Thought')
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
},


//Delete a thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thoughts) =>
            !thoughts
                ? res.status(404).json({ message: 'No thought with that ID' })
                : User.findOneAndUpdate(
                    { username: thoughts.username },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { runValidators: true, new: true }
                )
                    .then((user) =>
                        !user
                            ? res.status(404).json({ message: 'No user found with that username :(' })
                            : res.json(user)
                    )
        )
        .catch((err) => res.status(500).json(err));
},



  // Update a thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


//create a reaction
addReaction(req, res) {
  Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body }},
      { runValidators: true, new: true }
  )
  .then((thoughts) =>
      !thoughts
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thoughts)
  )
  .catch((err) => res.status(500).json(err));
},
// removes a reaction
removeReaction(req, res) {
  Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId, 'reactions.reactionId': req.params.reactionId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
  )
  .then((thoughts) =>
      !thoughts
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thoughts)
  )
  .catch((err) => res.status(500).json(err));
},


};