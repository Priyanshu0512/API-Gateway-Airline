const express = require('express')
const {UserMiddlewares} =require('../../middlewares')
const {UserController}= require('../../controllers')

const router = express.Router();

router.post('/',
                  UserMiddlewares.validateCreateRequest,
                  UserController.createUser
);

module.exports = router;