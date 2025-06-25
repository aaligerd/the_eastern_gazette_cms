const { db } = require("../database/db");

const getAllCategories = async (req, res) => {
  const getAllCategory = `select name as category_name from tbl_category`;
  try {
    const [categoryData] = await db.promise().query(getAllCategory);
    let categoryies = categoryData.map((cate) =>
      cate.category_name.replaceAll(" ", "-")
    );
    return res.status(200).json(categoryies);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getAllPostOfCategory = async (req, res) => {
  const { category } = req.params;
  let category_ref=category.replaceAll("-"," ");
  const getPostByCategory = `select
        tb.title as headline,
        tb.lables as topic,
        tb.by_line,
        tb.thumbnail_url,
        tb.updated_at as last_updated
        from tbl_blog tb
        join tbl_category tc on tc.category_id=tb.category_id
        where tc.name=? and tb.status='published';`;

    try {
        const [articles]=await db.promise().query(getPostByCategory,[category_ref]);
        return res.status(200).json(articles);
    } catch (error) {
        return res.status(500).json({ msg: error }); 
    }
};

module.exports = { getAllCategories, getAllPostOfCategory };
