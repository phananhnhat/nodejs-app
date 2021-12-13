// const http = require('http')
// const server = http.createServer((req, res) => {
//   if (req.url === '/about')
//     res.end('The about page')
//   else if (req.url === '/contact')
//     res.end('The contact page')
//   else if (req.url === '/')
//     res.end('The home page')
//   else {
//     res.writeHead(404)
//     res.end('page not found')
//   }
// })
// server.listen(3333);

// const express = require('express')
// const path = require('path')
// const app = express()

import express from 'express';
import path from 'path';
const app = express()

import sum from './Addition.js';

app.use(express.static('public'));

app.listen(3333, (request, response) => {
  console.log("App listening on port 3000")
});

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'about.html'))
})

app.get('/contact', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'contact.html'))
})

app.get('/content', (req, res) => {
  res.send('The content')
})


app.get("/", (req, res) => {
  console.log(sum());
  res.send('The home page')
})


app.get('*', function (req, res) {
  res.header(404)
  res.send('page not found')
});