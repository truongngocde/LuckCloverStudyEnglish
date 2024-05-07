const mogoose = require('mongoose');

const blogSchema = new mogoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 200,
        trim: true,
    },
    desc: {
        type: String,
        required: true,
        maxLength: 300,
        trim: true,
    },
    html: {
        type: String,
        require: true,
        trim: true,
    },
});

const Blog = mogoose.model('Blog', blogSchema);
module.exports = Blog;