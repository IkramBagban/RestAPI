const express = require('express')
const { body } = require('express-validator');
const router = express.Router()

const feedController = require('../controllers/feed')

router.get('/posts',feedController.getPosts);

router.post('/post',[ // adding validation for title and component. 
    body('title').trim().isLength({min : 7}),
    body('content').trim().isLength({min:5})
], feedController.createPost)

module.exports = router