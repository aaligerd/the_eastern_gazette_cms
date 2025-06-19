const { db } = require("../database/db");

const getHeroCarouselPost = async (req, res) => {
    const carouselQuery = `select 
        tb.title,
        tc.name as category,
        tsc.name as subcategory,
        tb.seo_url,
        tb.thumbnail_url
    from
    tbl_blog tb
    join tbl_category tc on tc.category_id=tb.category_id
    join tbl_subcategory tsc on tsc.subcategory_id = tb.subcategory_id
    where  tb.status="published" 
    limit 4;`;
    try{
        const [carouselPosts] = await db.promise().query(carouselQuery);
        console.log(carouselPosts)
        if (carouselPosts.length === 0) {
            return res.status(404).json({ message: 'No carousel posts found' });
        }
        return res.status(200).json(carouselPosts);
    }catch (error) {
        console.error('Error fetching carousel posts:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}

const getRedSectionData = async (req, res) => {
    const redSectionQuery = `select 
        tb.title,
        tc.name as category,
        tsc.name as subcategory,
        tb.seo_url,
        tb.thumbnail_url,
        tb.content
    from
    tbl_blog tb
    join tbl_category tc on tc.category_id=tb.category_id
    join tbl_subcategory tsc on tsc.subcategory_id = tb.subcategory_id
    where  tb.status="published"
    order by tb.created_at desc 
    limit 1;`;
    try {
        const [redSectionData] = await db.promise().query(redSectionQuery);
        if (redSectionData.length === 0) {
            return res.status(404).json({ message: 'No red section data found' });
        }
        return res.status(200).json(redSectionData[0]);
    } catch (error) {
        console.error('Error fetching red section data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getHeroCarouselPost, getRedSectionData };