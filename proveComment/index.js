const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())


app.post('/events', (req, res) => {
    const event = req.data;
    if (event.type === 'post') {
        allPosts.push({
            id: event.id,
            title: event.title
        });
        res.send('ok');
    }
    if (event.type === 'comment') {
        if(event.action === 'create'){
            allPosts[event.postId].comments.push({
                id: event.id,
                content: event.content,
                approved: event.approved,
            })
            res.send('ok');
        }
        else if(event.action === 'updateStatus') {
            const temp = allPosts[event.postId].comments.map(comment => {
                    if (comment.id === event.id) {
                        comment.approved = event.approved;
                    }
                }
            );
            allPosts = temp;
            res.send('ok');
        }
    }
    if (event.type === 'provecomment') {
        res.send('');
    }
});

app.get('/AllPostsWithComments', (req, res) => {
    res.send(allPosts);
});
