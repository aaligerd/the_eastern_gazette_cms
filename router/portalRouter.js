const express=require('express');
const { getHeroCarouselPost, getRedSectionData, } = require('../controller/portalController');

const portalRouterRouter=express.Router();

portalRouterRouter.get('/carousel', getHeroCarouselPost);
portalRouterRouter.get('/redsection', getRedSectionData);

module.exports=portalRouterRouter;