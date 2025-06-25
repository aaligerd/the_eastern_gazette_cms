const { db } = require("../database/db");

const getAllSubcategories = async (req, res) => {
  const getAllSubcategory = `select name as subcategory_name from tbl_subcategory`;
  try {
    const [subcategoryData] = await db.promise().query(getAllSubcategory);
    let subcategoryies = subcategoryData.map((subcate) =>
      subcate.subcategory_name.replaceAll(" ", "-")
    );
    return res.status(200).json(subcategoryies);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getAllPostOfSubcategory = async (req, res) => {
  const { subcategory } = req.params;
  let subcategory_ref=subcategory.replaceAll("-"," ");
  const getPostBySubategory = `select
        tb.title as headline,
        tb.lables as topic,
        tb.by_line,
        tb.thumbnail_url,
        tb.updated_at as last_updated
        from tbl_blog tb
        join tbl_subcategory ts on ts.subcategory_id=tb.subcategory_id
        where ts.name=? and tb.status='published';`;

    try {
        const [articles]=await db.promise().query(getPostBySubategory,[subcategory_ref]);
        return res.status(200).json(articles);
    } catch (error) {
        return res.status(500).json({ msg: error }); 
    }
};

module.exports = { getAllSubcategories, getAllPostOfSubcategory };
