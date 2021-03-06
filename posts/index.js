const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors())
const posts = {};

/**
 * Get all post
 */
app.get('/posts', (req, res) => {
    try {
        res.send(posts);
    }
    catch(e) {
        res.status(500);
    }
});

/**
 * Post single post
 * @param title
 * tile wird als body(json) übergeben
 */
app.post('/posts', (req, res) => {
    try {
        const id = randomBytes(4).toString('hex');
        const { title } = req.body;
        console.log(req.body);
        posts[id] = {
            id,
            title: title
        };
        axios.post('http://localhost:4005/events', {
            event: {
                type: 'post',
                id: id,
                title: title
            }
        }).catch((err) => {
            console.log(err.message);
        });
        console.log(posts[id]);
        res.status(201).send(posts[id]);
    }
    catch(e) {
        res.status(500);
    }
});


/**
 * Delete single post
 * @param id
 */
app.delete('/posts/:id', (req, res) => {
    try {
        let postId = req.params.id;
        delete posts[postId];
        res.send(posts);
    }
    catch(e) {
        res.status(500);
    }
});

app.listen(4000, () => {
   console.log('Listening on 4000')
});
