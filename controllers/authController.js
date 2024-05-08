const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.register = async function (req, res) {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
    });

    const users = await User.find({});
    if (users.length === 0) {
        newUser.role = 1; //admin
    } else {
        newUser.role = 2; //employee
    }

    try {
        await newUser.save();
        res.status(200).send({ message: 'User registered!' });
    } catch (err) {
        // res.status(500).send({ message: 'Error registering new user.' });
        res.status(500).send({ message: err.message });
    }
};

exports.login = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ message: 'Authentication failed. User not found.' });
        }

        const isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token: token });
        } else {
            res.status(401).send({ message: 'Authentication failed. Wrong password.' });
        }
    } catch (err) {
        throw err;
    }
};


exports.logout = function (req, res) {
    console.log(req)
    req.logout();
    res.json({ message: 'User logged out!' });
};
