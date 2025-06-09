const storyDataValidation = (req, res, next) => {
    const {
        created_date,
        lables,
    } = req.body;

    const requiredFields = [
        'title', 'created_by', 'created_date',
        'category', 'subcategory', 'seo_title', 'seo_headline',
        'seo_desc', 'seo_keywords', 'seo_url', 'thumbnail', 'status'
    ];

    for (const field of requiredFields) {
        if (!req.body[field] || typeof req.body[field] !== 'string' || req.body[field].trim() === '') {
            return res.status(400).json({ msg: `${field} is required and must be a non-empty string.` });
        }
    }
    
 

    if (lables && lables.length==0) {
        return res.status(400).json({ msg: 'Use atleast 1 lable' });
    }

    if (isNaN(Date.parse(created_date))) {
        return res.status(400).json({ msg: 'created_date must be a valid date string.' });
    }

    next();
};

const updateStoryValidation = (req, res, next) => {
    const {
        lables
    } = req.body;

    const requiredFields = [
        'title', 'content', 'seo_title', 'seo_headline',
        'seo_desc', 'seo_keywords', 'seo_url', 'thumbnail','seo_url_slug'
    ];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ msg: `${field} is required and must be a non-empty string.` });
        }
    }
    

    if (lables && lables.length==0) {
        return res.status(400).json({ msg: 'Use atleast 1 lable' });
    }

    if (!req.body.category || req.body.category === '-1') {
        return res.status(400).json({ msg: 'category is required and must be a valid category.' });
    }
    if (!req.body.subcategory || req.body.subcategory === '-1') {
        return res.status(400).json({ msg: 'subcategory is required and must be a valid subcategory.' });
    }

    next();
}


module.exports={storyDataValidation,updateStoryValidation}