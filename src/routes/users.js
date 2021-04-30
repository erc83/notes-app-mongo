const express = require('express');
const router = express.Router();

const User = require('../models/model-user')

const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('users/Login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/notes/notes', 
    failureRedirect: '/users/login',
    failureFlash: true
}));


router.get('/register', (req, res) => {
    res.render('users/Register');
});

router.post('/register', async (req, res) => {
    const {name, email, password, confirm_password} = req.body;
    const errors = [];
    if(!name || !email || !password || !confirm_password){
        errors.push({text: 'Se deben llenar todos los campos'})
    }
    if(password !== confirm_password){
        errors.push({text: "Los password no son iguales"});
    }
    if(password.length < 4){
        errors.push({text: 'Los password deben tener al menos de 4 caracteres'})
    }
    if(errors.length > 0){
        res.render('users/Register', {
            errors, name, email, password, confirm_password
        });
    }else{
        //validacion de email
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            req.flash('error_msg', 'The Email is already in use');
            res.redirect('/users/login');
        }

        // 
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/login');
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out now.")
    res.redirect('/users/login');
})



module.exports = router;