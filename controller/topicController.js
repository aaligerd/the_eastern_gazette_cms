const { db } = require("../database/db");

const getAllTopics = async (req, res) => {
  const getAlltopic = `select lable_name as topic_name from tbl_lable`;
  try {
    const [topicsData] = await db.promise().query(getAlltopic);
    let topics = topicsData.map((tpoic) =>
      tpoic.topic_name.toLowerCase().replaceAll(" ", "-")
    );
    return res.status(200).json(topics);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getAllPostOfTopics = async (req, res) => {
  const { topic } = req.params;
  let topic_ref=topic.replaceAll("-"," ");
  const getPostByTopic = `SELECT 
    tb.title as headline,
    tb.lables as topic,
    tb.by_line,
    tb.thumbnail_url,
    tb.updated_at as last_updated
    FROM tbl_blog tb 
    where tb.lables like ? and tb.status='published';`;
    const searchParam=`%${topic_ref}%`;
    try {
        const [articles]=await db.promise().query(getPostByTopic,[searchParam]);
        return res.status(200).json(articles);
    } catch (error) {
        return res.status(500).json({ msg: error }); 
    }
};

module.exports = { getAllTopics, getAllPostOfTopics };
