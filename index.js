const express = require('express');
const fs = require('fs');
const blogs = require('./blogs');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Read all blogs
app.get('/', (req, res) => {
  res.json(blogs);
});

// Create blogs
app.post('/blogs', (req, res) => {
  const newBlog = req.body;
  if (!isValid(newBlog)) {
    res.status(400).end('Invalid request!');
  } else {
    newBlog.id = uuidv4();
    const title = newBlog.title;
    const content = newBlog.content;
    // blogs.push(newBlog);
    // res.json({ msg: 'Blog created!', Blogs: blogs });
    fs.writeFileSync(title, content);
    res.end('ok');
  }
});

// Update blogs
app.put('/blogs/:title', (req, res) => {
  if (fs.existsSync(req.params.title)) {
    const title = req.params.title;
    const content = req.body.content;
    fs.writeFileSync(title, content);
    res.end('ok');
  } else {
    res.status(404).send('This post does not exist!');
  }
});

function isValid(blog) {
  if (typeof blog !== 'object') return false;
  if (typeof blog.title == 'undefined') return false;
  if (typeof blog.content == 'undefined') return false;
  return true;
}

app.listen('5000', () => console.log('Server started at port 5000'));
