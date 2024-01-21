const express = require('express');

const router=express.Router();

const {info_controller} = require('../../controllers');


router.get('/info',info_controller.info);

module.exports=router;
