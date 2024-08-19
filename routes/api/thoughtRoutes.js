const controllers = require("../../controllers/thoughtC");
const router = require('express').Router();

const {
    getallThoughts,
    getThought,
    createThought,
    deleteThought,
    updateThought,
    thoughtReaction,
    deleteReaction
} = require("../../controllers/thoughtC");

router.route('/').get(getallThoughts).post(createThought)

router.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions').post(thoughtReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)


module.exports = router;