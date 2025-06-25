const express=require('express');
const { getAllCategories, getAllPostOfCategory } = require('../controller/categoryController');
const cateoryRouter=express.Router();



cateoryRouter.get('/',getAllCategories)
cateoryRouter.get('/:category',getAllPostOfCategory)



module.exports=cateoryRouter;