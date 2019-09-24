const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/logOut', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/signUp', (req, res) => {
    const {username, email, password, password2} = req.body;
    let errors = [];
    if(!username || !email || !password || !password2){
        errors.push({msg: 'Please fill in all the fields'});
    }
    if(password !== password2){
        errors.push({msg: 'Password do not match'});
    }
    console.log(errors);
    if((!password || password.length < 6)) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if(errors.length < 0) {
        User.findOne({email:email})
            .then(function (user) {
                if(user){
                    errors.push({msg:'this: '+email+' is already sign up'});
                    res.render('index',{
                        errors,
                        username,
                        email,
                        password,
                        password2
                    });
                }
                else{
                    let cryptPassword;
                    bcrypt.genSalt(10,(err,salt) =>
                        bcrypt.hash(password,salt,(err,hash) => {
                            if(err) throw err;
                            cryptPassword = hash;
                            User.create({
                                username: username,
                                email: email,
                                local:{password: cryptPassword}
                            })
                                .then(
                                    res.render('index',{
                                    errors,
                                    username,
                                    email,
                                    password,
                                    password2
                                }))
                                .catch(err => console.log(err));
                        }));


                }
            })
            .catch(function (error) {
                throw(error);
            })
    }
    else{
        console.log('not pass');
        res.render('index',{
            errors,
            username,
            email
        });
    }

});
router.post('/login', (req, res) => {
    const {username, email, password, password2} = req.body;
    let errors = [];
    if(!username || !password){
        errors.push({msg: 'Please fill in all the fields'});
    }
    console.log(errors);
    if(errors.length < 0) {
        console.log('pass');
    }
    else{
        console.log('not pass');
        res.render('index',{
            errors,
            username
        })
    }

});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});

router.get('/facebook', passport.authenticate('facebook'/*, {
    scope: ['profile', 'email']
}*/));

// callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/');
});
module.exports = router;