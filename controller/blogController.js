const { db } = require("../database/db");
const { getDateTimeString } = require("../utils/dateFunctions.js");

const createStoryAsDraft=async(req,res)=>{
    let{title,content,created_by,created_date,category,subcategory,lables,seo_title,seo_headline,seo_desc,seo_keywords,seo_url,thumbnail,status}=req.body;
    created_date=getDateTimeString(created_date);

    const createDraftQ=`INSERT INTO tbl_blog(title,content,category_id,subcategory_id,lables,status,seo_title,seo_headline,seo_description,seo_keywords,seo_url,thumbnail_url,created_by,updated_at,updated_by) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
    try {
        await db.promise().query(createDraftQ,[title,content,1,2,lables.join(','),status,seo_title,seo_headline,seo_desc,seo_keywords,seo_url,thumbnail,created_by,created_date,created_date,created_by]);
        //get the last inserted id
        const [rows,fields]=await db.promise().query(`select max(blog_id) as last_inserted_id from tbl_blog;`);
        return res.status(201).json({msg:'Story created as draft successfully',id:rows[0].last_inserted_id});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Error while creating story as draft',error:error.message});
    }


}


const getStoryForCMSDashboard=async(req,res)=>{
    const getStoryQ=`SELECT * FROM tbl_blog order by blog_id DESC;`;
    try {
        const [rows,fields]=await db.promise().query(getStoryQ);
        return res.status(200).json({msg:'Stories fetched successfully',data:rows});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Error while fetching stories',error:error.message});
    }
}


const getStoryForCmsById=async(req,res)=>{
    const { id } = req.params;
    const getStoryQ = `SELECT * ,
    tc.name as category,
    ts.name as subcategory
    FROM tbl_blog tb
    join tbl_category tc on tc.category_id=tb.category_id
    join tbl_subcategory ts on ts.subcategory_id=tb.subcategory_id
    WHERE tb.blog_id = ?;`;
    try {
        const [rows, fields] = await db.promise().query(getStoryQ, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Story not found' });
        }
        return res.status(200).json({ msg: 'Story fetched successfully', data: rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error while fetching story', error: error.message });
    }
}


const makeBlogUnpublishedById=async(req,res)=>{
    const { id } = req.params;
    const updateStatusQ = `UPDATE tbl_blog SET status = 'draft' WHERE blog_id = ?;`;
    try {
        const [result] = await db.promise().query(updateStatusQ, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Story not found or already unpublished' });
        }
        return res.status(200).json({ msg: 'Story is on draft mode' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error while unpublishing story', error: error.message });
    }
}

const updateStoryAndSaveById=async(req,res)=>{
    const { blog_id, title, updated_content, category, subcategory, lables, seo_title, seo_headline, seo_desc, seo_keywords, seo_url_slug, thumbnail,updated_by,updated_at } = req.body;
    console.log("Updated Content",updated_at);
    const updateStoryQ = `UPDATE tbl_blog SET title = ?, content = ?, category_id = ?, subcategory_id = ?, lables = ?, seo_title = ?, seo_headline = ?, seo_description = ?, seo_keywords = ?, seo_url = ?, thumbnail_url = ?,updated_at=?,updated_by=? WHERE blog_id = ?;`;
    try {
        await db.promise().query(updateStoryQ, [title,updated_content, category, subcategory, lables.join(','), seo_title, seo_headline, seo_desc, seo_keywords, seo_url_slug, thumbnail,updated_at,updated_by, blog_id]);
        return res.status(200).json({ msg: 'Story updated and saved successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error while updating story', error: error.message });
    }
}

const getCategoryListForBlog=async(req,res)=>{
    const getCategoryQ=`SELECT * FROM tbl_category;`;
    try {
        const [rows,fields]=await db.promise().query(getCategoryQ);
        return res.status(200).json({msg:'Categories fetched successfully',data:rows});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Error while fetching categories',error:error.message});
    }
}

const getSubCategoryListForBlog=async(req,res)=>{
    const getSubCategoryQ=`SELECT * FROM tbl_subcategory ;`;
    try {
        const [rows,fields]=await db.promise().query(getSubCategoryQ);
        return res.status(200).json({msg:'Subcategories fetched successfully',data:rows});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Error while fetching subcategories',error:error.message});
    }
}

const makeBlogPublishedById=async(req,res)=>{
    const { id } = req.params;
    const updateStatusQ = `UPDATE tbl_blog SET status = 'published' WHERE blog_id = ?;`;
    try {
        const [result] = await db.promise().query(updateStatusQ, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Story not found or already published' });
        }
        return res.status(200).json({ msg: 'Story published successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error while publishing story', error: error.message });
    }
}

module.exports={createStoryAsDraft,getStoryForCMSDashboard,getStoryForCmsById,makeBlogUnpublishedById,updateStoryAndSaveById,getCategoryListForBlog,getSubCategoryListForBlog,makeBlogPublishedById};