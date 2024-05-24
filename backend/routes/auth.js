const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post(
    '/signup', 
    [
        body('name').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Veuillez entrer un email valide')
        .custom(async (email) => {
            const user = await User.find(email);
            if(user[0].length > 0){
                return Promise.reject('Adresse email déjà utilisée')
            }
        })
        .normalizeEmail(), 
        body('password').trim().isLength({ min: 8})
    ], authController.signup
);

router.post('/login', authController.login);


module.exports = router;
