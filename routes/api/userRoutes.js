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


router.route('/').get(getUser).post(createUser);


router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);



router.route('/:userId/friends/:friendId').put(addFriend).delete(removeFriend);

module.exports = router;
