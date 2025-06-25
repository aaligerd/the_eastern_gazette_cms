const express=require('express');
const { getAllSubcategories, getAllPostOfSubcategory } = require('../controller/subcategoryController');
const subcateoryRouter=express.Router();



subcateoryRouter.get('/',getAllSubcategories)
subcateoryRouter.get('/:subcategory',getAllPostOfSubcategory)



module.exports=subcateoryRouter;