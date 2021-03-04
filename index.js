const express = require('express');
const fs = require('fs');
const blogs = require('./blogs');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Read blogs
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen('5000', () => console.log('Server started at port 5000'));
