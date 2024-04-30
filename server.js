import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Simulated database array
let posts = [
  { id: 1, title: "Post 1", text: "This is the first post", author: "Author 1", createdAt: new Date() },
  { id: 2, title: "Post 2", text: "This is the second post", author: "Author 2", createdAt: new Date() },
  { id: 3, title: "Post 3", text: "This is the third post", author: "Author 3", createdAt: new Date() },
  { id: 4, title: "Post 4", text: "This is the fourth post", author: "Author 4", createdAt: new Date() },
  { id: 5, title: "Post 5", text: "This is the fifth post", author: "Author 5", createdAt: new Date() }
];

// Get all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Get a single post by ID
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

// Create a new post
app.post('/posts', (req, res) => {
  const { title, text, author } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    text,
    author,
    createdAt: new Date()
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update a post by ID
app.put('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, text, author } = req.body;
  const postToUpdate = posts.find(post => post.id === postId);
  if (postToUpdate) {
    postToUpdate.title = title;
    postToUpdate.text = text;
    postToUpdate.author = author;
    res.json(postToUpdate);
  } else {
    res.status(404).send('Post not found');
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
