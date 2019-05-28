const express = require('express');
const router = express.Router();
const restricted = require('../auth/restricted');
const bcrypt = require('bcryptjs');

const db = require('../data/dbConfig');
const Users = require('../helpers/users/usersModel');

router.get('/', async (req, res) => {
    try {
        const users = await Users.get();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Unable to retrieve users" })
    }
});

router.get('/:id', async (req, res) => {
    try {
        let user = await Users.findById(req.params.id);
        if (!user) { 
            res.status(404).json({ error: "user does not exist" });
        } else {
            res.status(200).json(user);
        }
    } catch(error) {
        res.status(500).json({ error, message: "Unable to get user" });
    }
});

