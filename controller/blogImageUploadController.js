const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const uploadImage=async (req, res) => {
    const filePath = req.file.path;
    const originalExt = req.file.mimetype;
  
    let finalFilePath = filePath;
  
    // Convert to webp if not already
    if (originalExt !== 'image/webp') {
      finalFilePath = `${filePath}-converted.webp`;
      await sharp(filePath)
        .webp()
        .toFile(finalFilePath);
      // fs.unlinkSync(filePath); // delete original
    }
  
    // Upload to Cloudinary
    try {
      const result = await cloudinary.uploader.upload(finalFilePath, {
        resource_type: 'image',
        folder: 'editorjs',
      });
      fs.unlinkSync(finalFilePath); // clean up converted file
  
      return res.json({
        success: 1,
        file: {
          url: result.secure_url,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: 0, message: 'Upload failed' });
    }
  }

module.exports={uploadImage}