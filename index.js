const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');
const flash = require('connect-flash');

// Controller
const getPostController = require('./controllers/getPost')
const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

// Middleware
const validationMiddleware = require("./middleware/validationMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const app = express()

const ejs = require('ejs')
app.set('view engine','ejs')

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use('/posts/store', validationMiddleware)
app.use(expressSession({secret: 'keyboard cat'}))
app.use(flash());

app.use('/post/:id', (req,res,next) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('URL', fullUrl)
  next();
})

mongoose.connect('mongodb+srv://admin:System.out12345@clusterfirst.vokf8bf.mongodb.net/my_database', {useNewUrlParser: true});

// app.listen(3333, (request, response) => {
//   console.log("App listening on port 3333")
// });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3333;
}
app.listen(port, ()=>{
  console.log('App listening...')
})

global.loggedIn = null;
app.use("*", (req, res, next) => {
  // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  // console.log('****', fullUrl)
  loggedIn = req.session.userId;
  next()
});

app.get('/', homeController)

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req, res) => res.render('notfound'));

// app.get('*', function (req, res) {
//   res.header(404)
//   res.send('page not found')
// });
