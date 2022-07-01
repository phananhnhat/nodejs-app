const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost')

const app = express()

const ejs = require('ejs')
app.set('view engine','ejs')

app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});

app.listen(3333, (request, response) => {
  console.log("App listening on port 3333")
});

app.get("/", (req, res) => {
  // res.sendFile(path.resolve(__dirname,'pages/index.html'))
  res.render('index');
})

app.get('/about',(req,res)=>{
  // res.sendFile(path.resolve(__dirname,'pages/about.html'))
  res.render('about');
})

app.get('/contact',(req,res)=>{
  // res.sendFile(path.resolve(__dirname,'pages/contact.html'))
  res.render('contact');
})

app.get('/post',(req,res)=>{
  // res.sendFile(path.resolve(__dirname,'pages/post.html'))
  res.render('post');
})

app.get('/create',(req,res)=>{
  BlogPost.create({
    title: 'this is title',
    body: `If you`,
}, (error, blogpost) =>{
    console.log(error,blogpost)
  })
  res.render('post');
})

app.get('*', function (req, res) {
  res.header(404)
  res.send('page not found')
});
