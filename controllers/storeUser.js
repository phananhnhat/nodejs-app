const User = require('../models/User.js')
const path = require('path')

module.exports = (req,res)=>{
  User.create(req.body, (error, user) => {
    if(error){
      const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
      console.log('validationErrors', validationErrors)
      // TODO: Ko nên lưu vào session, thay đó sẽ sử dụng package 'connect-flash'
      // req.session.validationErrors = validationErrors
      req.flash('validationErrors',validationErrors)
      // Lưu lại nếu lưu bị lỗi thì người dùng cũng không cần nhập lại user và password
      req.flash('data', req.body)
      return res.redirect('/auth/register')
    }
    res.redirect('/')
  })
}
