const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const express = require('express');

const app = express();
app.use(bodyParser.json());

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
        const commentId = randomBytes(4).toString('hex');
        const { content } = req.body;
        console.log('1post comment!')
        const comments = commentsByPostId[req.params.id] || [];
        console.log('2post comment!')
        comments.push({id: commentId, content});
        console.log('3post comment!')
        commentsByPostId[req.params.id] = comments;
        console.log('4post comment!')

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
        delete commentToDelete.find( x => x.id === req.params.comid);
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
