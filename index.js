const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const BlogPost = require('./models/BlogPost')

// Controller
const getPostController = require('./controllers/getPost')
const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

// Middleware
const validationMiddleware = require("./middleware/validationMiddleware");

const app = express()

const ejs = require('ejs')
app.set('view engine','ejs')

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use('/posts/store', validationMiddleware)


mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});

app.listen(3333, (request, response) => {
  console.log("App listening on port 3333")
});

app.get('/', homeController)

app.get('/post/:id', getPostController)

app.get('/posts/new', newPostController)

app.post('/posts/store', storePostController)

app.get('/auth/register', newUserController);

app.post('/users/register', storeUserController)

app.get('/auth/login', loginController);

app.post('/users/login',loginUserController)

app.get('*', function (req, res) {
  res.header(404)
  res.send('page not found')
});
