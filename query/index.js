const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const allPosts = {};


app.post('/events', (req, res) => {
    const event = req.data;
    if (event.type === 'post') {
        allPosts.push({
            id: event.id,
            title: event.title,
        });
        res.send('ok');
    }
    if (event.type === 'comment') {
        allPosts[event.postId].comments.push({
            id: event.id,
            content: event.content,
        })
        res.send('ok');
    }
    if (event.type === 'provecomment') {
        res.send('ok');
    }
});

app.get('/AllPostsWithComments', (req, res) => {
    res.send(allPosts);
});
