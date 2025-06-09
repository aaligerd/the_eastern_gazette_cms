const express=require('express');
const { createStoryAsDraft, getStoryForCMSDashboard,getStoryForCmsById, makeBlogUnpublishedById,updateStoryAndSaveById } = require('../controller/blogController');
const { storyDataValidation, updateStoryValidation } = require('../middlewares/blogMiddlewares');
const blogRouter=express.Router();


blogRouter.post('/create',storyDataValidation,createStoryAsDraft)
blogRouter.get('/get/cms/dashboard',getStoryForCMSDashboard)
blogRouter.get('/get/cms/story/:id',getStoryForCmsById);
blogRouter.get('/unpublish/:id',makeBlogUnpublishedById);
blogRouter.post('/save',updateStoryValidation,updateStoryAndSaveById);//doesnot update story status, just saves the story data




module.exports=blogRouter;