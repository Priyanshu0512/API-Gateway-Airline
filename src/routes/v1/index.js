const express = require('express');
const router=express.Router();
const {info_controller} = require('../../controllers');
const {AuthMiddlewares} = require('../../middlewares')

const userRoutes = require('./user_routes');


router.get('/info',
                   AuthMiddlewares.checkAuth,
                   info_controller.info
);

router.use('/user',userRoutes);

module.exports=router;
