const express=require('express');
const { createStoryAsDraft, getStoryForCMSDashboard,getStoryForCmsById, makeBlogUnpublishedById,updateStoryAndSaveById,getCategoryListForBlog, getSubCategoryListForBlog,makeBlogPublishedById} = require('../controller/blogController');
const { storyDataValidation, updateStoryValidation } = require('../middlewares/blogMiddlewares');
const blogRouter=express.Router();


blogRouter.post('/create',storyDataValidation,createStoryAsDraft)
blogRouter.get('/get/cms/dashboard',getStoryForCMSDashboard)
blogRouter.get('/get/cms/story/:id',getStoryForCmsById);
blogRouter.get('/unpublish/:id',makeBlogUnpublishedById);
blogRouter.get('/publish/:id',makeBlogPublishedById);
blogRouter.post('/save',updateStoryValidation,updateStoryAndSaveById);//doesnot update story status, just saves the story data
blogRouter.get('/get/list/category/',getCategoryListForBlog);
blogRouter.get('/get/list/subcategory/',getSubCategoryListForBlog);



module.exports=blogRouter;