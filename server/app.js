const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//   title: 'Hello World',
//   image:
//     'https://i.pinimg.com/originals/cb/16/bb/cb16bb284a2a80c75041c80ba63e62d3.jpg',
//   body: 'Hello World Blog Body',
// });

// RESTFUL ROUTES
app.get('/', function (req, res) {
  res.redirect('/blogs');
});
// /blogs           GET
app.get('/blogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      res.status(500).send('Error');
      console.log(err);
    } else {
      res.json(blogs);
    }
  });
});
// /blogs/new       GET
// /blogs           POST
app.post('/blogs', function (req, res) {
  Blog.create(req.body, function (err, newBlog) {
    if (err) {
      res.status(500);
      res.json({ error: 'Error' });
    } else {
      res.status(201);
      res.json({ message: 'Blog added', id: newBlog._id });
    }
  });
});
// /blogs/:id       GET
app.get('/blogs/:id', function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.status(404);
      res.json({ error: 'Error' });
    } else {
      res.status(200);
      res.json({ blog: foundBlog });
    }
  });
});

// /blogs/:id/edit  GET
// /blogs/:id       PUT
app.put('/blogs/:id', function (req, res) {
  Blog.findByIdAndUpdate(req.params.id, req.body, function (err, updatedBlog) {
    if (err) {
      res.status(400);
      res.json({ error: 'Error' });
    } else {
      res.status(200);
      res.json({ blog: updatedBlog });
    }
  });
});
// /blogs/:id       DELETE
app.delete('/blogs/:id', function (req, res) {
  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.status(404);
      res.json({ error: 'Error' });
    } else {
      res.status(200);
      res.json({ message: 'Removed' });
    }
  });
});

app.listen(3000, function () {
  console.log('Server is running...');
});
