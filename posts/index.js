const randomBytes = require('crypto');
const bodyParser = require('body-parser')
const express = require('express');

const app = express();
app.use(bodyParser.json());
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id, title
    };
});

app.listen(4000, () => {
   console.log('Listening on 4000')
});
