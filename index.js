const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const BlogPost = require('./models/BlogPost')

const app = express()

const ejs = require('ejs')
app.set('view engine','ejs')

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())


mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});

app.listen(3333, (request, response) => {
  console.log("App listening on port 3333")
});

app.get("/", async (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/index.html'))

  // res.render('index');

  const blogposts = await BlogPost.find({})
  res.render('index',{
    blogposts: blogposts
  });
})

app.get('/about',(req,res)=>{
  // res.sendFile(path.resolve(__dirname,'pages/about.html'))
  res.render('about');
})

app.get('/contact',(req,res)=>{
  // res.sendFile(path.resolve(__dirname,'pages/contact.html'))
  res.render('contact');
})

app.get('/post/:id', async (req,res)=>{
  // res.sendFile(path.resolve(__dirname,'pages/post.html'))
  // res.render('post')

  const blogpost = await BlogPost.findById(req.params.id)
  res.render('post',{
    blogpost
  })
})

app.get('/posts/new',(req,res)=>{
  // res.sendFile(path.resolve(__dirname,'pages/post.html'))
  res.render('create');
})

app.post('/posts/store',(req,res)=>{
  // Chap 6 -----------------------
  // BlogPost.create(req.body,(error,blogpost) =>{
  //   res.redirect('/')
  // })

  // await BlogPost.create(req.body)
  // res.redirect('/')
  // ------------------------------

  let image = req.files.image;
  image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
    console.log(error)
    await BlogPost.create({
      ...req.body,
      image: '/img/' + image.name
    })
    res.redirect('/');
  })
})

app.get('/test-mongodb',(req,res)=>{
//   BlogPost.create({
//     title: 'this is title',
//     body: `If you`,
// }, (error, blogpost) =>{
//     console.log(error,blogpost)
//   })

  // BlogPost.find({}, (error, blogspot) =>{
  //   console.log(error,blogspot)
  // })

  // BlogPost.find({
  //   title:'this is title'
  // }, (error, blogspot) =>{
  //   console.log(error,blogspot)
  // })
  //
  // BlogPost.find({
  //   title: /this is/
  // }, (error, blogspot) =>{
  //   console.log(error,blogspot)
  // })

  // const id = "61baf1a96d6fd46add8b6c8f";
  // BlogPost.findById(id, (error, blogspot) =>{
  //   console.log(error,blogspot)
  // })

  // const id = "62bece81d1108fd764a81d02";
  // BlogPost.findByIdAndUpdate(id,{
  //   title:'this is title - Updated title'
  // }, (error, blogspot) =>{
  //   console.log(error,blogspot)
  // })

  // var id = "5cb436980b33147489eadfbb";
  // BlogPost.findByIdAndDelete(id, (error, blogspot) =>{
  //   console.log(error,blogspot)
  // })

  res.render('post');
})

app.get('*', function (req, res) {
  res.header(404)
  res.send('page not found')
});
