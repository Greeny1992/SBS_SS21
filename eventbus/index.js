const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors())


app.post('/events', (req, res) => {

    const event = req.body;
    console.log('BUSSSSSSSSSS')
    console.log(event)
    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log(err.message);
    })
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err.message);
    })
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err.message);
    })
    axios.post('http://localhost:4003/events', event).catch((err) => {
        console.log(err.message);
    })

    res.send({status: "ok"});
});

app.listen(4005, () => {
    console.log("Listening on 4005");
})
