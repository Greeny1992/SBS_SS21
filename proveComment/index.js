const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())


