const express = require('express');

const router=express.Router();

const {info_controller} = require('../../controllers');
const userRoutes = require('./user_routes');


router.get('/info',info_controller.info);

router.use('/signup',userRoutes);

module.exports=router;
