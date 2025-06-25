const express=require('express');
const { getAllTopics, getAllPostOfTopics } = require('../controller/topicController');
const topicRouter=express.Router();



topicRouter.get('/',getAllTopics)
topicRouter.get('/:topic',getAllPostOfTopics)



module.exports=topicRouter;