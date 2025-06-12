const express=require('express');
const { setUserLogin } = require('../controller/loginController');

const loginRouter=express.Router();


loginRouter.post('/login',setUserLogin)




module.exports=loginRouter;