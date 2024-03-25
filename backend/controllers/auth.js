const { validationResult } = require('express-validator');

const bcrypt = require ('bcryptjs');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    console.log("a");
    const errors = validationResult(req);
    console.log("b");
    if (!errors.isEmpty()) return;
    console.log("c)");

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log("d");
    try{
        const hashedPassword = await bcrypt.hash(password, 12);

        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword,
        };
        console.log("0");
        const result = await User.save(userDetails);
        console.log("1");

        res.status(201).json({ message: 'Utilisateur enregistré' });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};