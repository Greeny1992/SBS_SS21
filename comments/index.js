const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const commentsByPostId = {};

/**
 * Get comments to post
 */
app.get('/posts/:id/comments', (req, res) => {
    try {
        res.send(commentsByPostId[req.params.id] || []);
    }
    catch(e) {
        res.status(500);
    }
});

/**
 * Get single comment to a post
 */
app.get('/posts/:id/comments/:comid', (req, res) => {
    try {
        console.log(req.params.comid)
        res.send(commentsByPostId[req.params.id].find(x => x.id === req.params.comid) || []);
    }
    catch(e) {
        res.status(500);
    }
});


/**
 * Post comment to Post
 * @param content
 * content wird als body(json) übergeben
 */
app.post('/posts/:id/comments', (req, res) => {
    try {
        const postId = req.params.id;
        const commentId = randomBytes(4).toString('hex');
        const { content } = req.body;
        const comments = commentsByPostId[postId] || [];
        comments.push({id: commentId, content});
        axios.post('https://localhost:4005/events', {
            event: {
                type: 'comment',
                id: commentId,
                postId: postId,
                content: content,
                action: 'create',
            }
        }).catch((err) => {
            console.log(err.message);
        });
        commentsByPostId[postId] = comments;
        console.log(req.body);
        console.log(comments);
        res.status(201).send(comments);
    }
    catch(e) {
        res.status(500);
    }
});



/**
 * Delete single comments
 * @param id
 */
app.delete('/posts/:id/comments/:comid', (req, res) => {
    try {
        let postId = req.params.id;
        let comId = req.params.comid;
        let commentToDelete = commentsByPostId[req.params.id];
        delete commentToDelete.find(x => x.id === req.params.comid);
        console.log(commentToDelete.find( x => x.id === req.params.comid))
        res.send(commentsByPostId[req.params.id]);
    }
    catch(e) {
        res.status(500);
    }
});

app.listen(4001, () => {
    console.log('Listening on 4001')
});
