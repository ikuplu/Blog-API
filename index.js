const express = require('express');
const fs = require('fs');

const app = express();

// Body Parser Middleware
app.use(express.json());

// Read all blogs
app.get('/', (req, res) => {
  const blogList = fs.readdirSync('./Blogs');
  blogList.forEach((blog, index) => {
    blogList[index] = { title: blog };
  });

  if (blogList.length !== 0) {
    res.send(blogList);
  } else {
    res.status(404).send(`There aren't any blogs!`);
  }
});

// Read a blog
app.get('/blogs/:title', (req, res) => {
  const title = `./Blogs/${req.params.title}`;
  if (fs.existsSync(title)) {
    res.send(fs.readFileSync(title));
  } else {
    res.status(404).send('This blog does not exist!');
  }
});

// Create a blog
app.post('/blogs', (req, res) => {
  const title = `./Blogs/${req.body.title}`;
  const content = req.body.content;
  if (!isValid(req.body)) {
    res.status(400).end('Invalid request!');
  } else {
    fs.writeFileSync(title, content);
    res.end('ok');
  }
});

// Update a blog
app.put('/blogs/:title', (req, res) => {
  const title = `./Blogs/${req.params.title}`;
  const content = req.body.content;
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end('ok');
  } else {
    res.status(404).send('This blog does not exist!');
  }
});

// Delete a blog
app.delete('/blogs/:title', (req, res) => {
  const title = `./Blogs/${req.params.title}`;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end('ok');
  } else {
    res.status(404).send('This blog does not exist!');
  }
});

// Check if the request body is proper for a post request
function isValid(blog) {
  if (typeof blog !== 'object') return false;
  if (typeof blog.title === 'undefined') return false;
  if (typeof blog.content === 'undefined') return false;
  return true;
}

app.listen('5000', () => console.log('Server started at port 5000'));
