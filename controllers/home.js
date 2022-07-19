const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    console.log("Your IP Addresss is: " + req.socket.localAddress);
    const blogposts = await BlogPost.find({}).populate('userid');
    res.render('index', {
        blogposts
    });
}
