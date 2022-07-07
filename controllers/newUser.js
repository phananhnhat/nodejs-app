const flash = require('connect-flash');

module.exports = (req, res) =>{
  var username = ""
  var password = ""
  // TODO by NhatPA: với data lưu trong flash là 1 object thì sẽ được chuyển thành 1 array => Lưu ý
  const data = req.flash('data')[0];
  if(typeof data != "undefined"){
    username = data.username
    password = data.password
  }
  res.render('register', {
    // TODO: Ko nên lưu vào session, thay đó sẽ sử dụng package 'connect-flash'
    // errors: req.session.validationErrors,
    errors: req.flash('validationErrors'),
    username: username,
    password: password
  }) // render register.ejs
}
