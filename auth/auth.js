const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');

const secrets = require('../config/secret');
const User = require('../helpers/users/usersModel');

function generateToken(user) {
    const payload = {
        subject: user.id,
        usename: user.username,
    };
    const options = {
        expiresIn: '24h',
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
};

router.post('/register', (req, res) => {
    let user = req.body;
    const email = user.email;
    const username = user.username;
    const password = user.password;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    if (email && !validator.validate(email)) {
        res.status(400).json({ message: "Please provide valid email" });
    } else if (!username || !password) {
        res.status(401).json({ message: "Must enter a username and password" });
    // } else if (await User.findBy({ username })) {
    //     res.status(400).json({ message: "That username is taken" })
    // } else if (password.length < 8) {
    //     res.status(400).json({ message: "Password must be at least 8 characters" })
    } else {
        User.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    }
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    User.findBy({ username })
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: `Welcome ${user.username}!`, token });
        } else {
            res.status(401).json({ message: "Try again" });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.get('/logout', (req, res) => {
    const token = req.body.token;
    jwt.verify(token, secret, err => {
        if (err) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
});

module.exports = router;