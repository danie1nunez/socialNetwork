const controllers = require("../../controllers/userC");
const router = require('express').Router();

const {
    getallUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require("../../controllers/userC");

router.route('/').get(getallUsers).post(createUser);

router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)


module.exports = router;