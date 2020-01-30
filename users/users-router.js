const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./users-model.js');
const restricted = require('./restricted-middleware.js');

router.post('/register', (req, res) => {
    let {username, password, department}= req.body;
    const hash = bcrypt.hashSync(password, 8); 

    Users.add({username, password: hash, department})
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy(username)
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {

                const token = signToken(user);

                res.status(200).json({
                    token,
                    message: `Welcome, ${user.id}!`,
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
});

router.get('/users', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

function signToken(user) {
    const payload = {
        username: user.username
    };
    const secret = process.env.JWT_SECRET || 'is it secret, is it safe?';

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secret, options)
}

module.exports = router;