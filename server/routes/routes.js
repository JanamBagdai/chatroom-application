const express = require('express');
const router = express.Router();

const {postUser, validateUser} = require('../controllers/userController');

router.post('/post-user', postUser)
router.post('/validate-user', validateUser)

module.exports = router;
