const express=require('express');
const { getLablesByString } = require('../controller/blogController');
const lableRouter=express.Router();


lableRouter.get('/get/:searchword',getLablesByString);




module.exports=lableRouter;