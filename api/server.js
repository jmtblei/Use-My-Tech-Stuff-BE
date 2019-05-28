const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('../auth/auth');
const items = require('../auth/items');
const users = require('../auth/users');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', auth);
server.use('/api/users', users);
server.use('/api/items', items);

server.get('/', (req, res) => {
    res.send('Henlo fren!')
});

module.exports= server;