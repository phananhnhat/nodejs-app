module.exports = (req, res) => {
    // res.sendFile(path.resolve(__dirname,'pages/post.html')) // => Khi di chuyển từ index.js vào thư mục controller thì path sẽ ko chính xác nữa
   if(req.session.userId){
      return res.render("create", {
         createPost: true,
      });
   }
   res.redirect('/auth/login')
}
