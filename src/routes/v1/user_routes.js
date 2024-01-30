const express = require('express')
const {AuthMiddlewares} =require('../../middlewares')
const {UserController}= require('../../controllers')

const router = express.Router();

router.post('/signUp',
                  AuthMiddlewares.validateAuthRequest,
                  UserController.createUser
);
router.post('/signIn',
                  AuthMiddlewares.validateAuthRequest,
                  UserController.signIn
);
router.post('/role',
                  AuthMiddlewares.checkAuth,
                  AuthMiddlewares.isAdmin,
                  UserController.addRoleToUser
);
module.exports = router;