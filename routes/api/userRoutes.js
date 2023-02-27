const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController')

// /api/students
router.route('/').get(getUser).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);


// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/friends/:friendId').put(addFriend).delete(removeFriend);

module.exports = router;
