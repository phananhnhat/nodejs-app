module.exports = (req, res) => {
    // res.sendFile(path.resolve(__dirname,'pages/post.html')) // => Khi di chuyển từ index.js vào thư mục controller thì path sẽ ko chính xác nữa
   res.render('create');
}
