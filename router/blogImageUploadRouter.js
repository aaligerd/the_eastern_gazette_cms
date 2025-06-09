const express=require('express')
const multer = require('multer');
const { uploadImage } = require('../controller/blogImageUploadController');

const imageUploaderRouter=express.Router();
const upload = multer({ dest: 'uploads/' });

imageUploaderRouter.post('/', upload.single('image'), uploadImage);

module.exports=imageUploaderRouter;