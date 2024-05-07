const Blog = require('../models/blogModel');

exports.getBlogList = async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).select('-html');
        return res.status(200).json({ blogs })
    } catch (error) {
        console.error('GET BLOG LIST ERROR: ', error);
        return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
    }
}

exports.getBlogHtml = async (req, res, next) => {
    try {
        const { _id } = req.query;
        if (!Boolean(_id)) {
            return res.status(400).json({
                message: 'id không hợp lệ !'
            })
        }
        const {blogHtmls = ''} = await Blog.findById(_id).select('-_id html');
        return res.status(200).json({blogHtmls});

    } catch (error) {
        console.error(' ERROR: ', error);
        return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
    }
}
