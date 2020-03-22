const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


router.get('/logOut', (req, res) => {
    req.logout();
    res.redirect('/');
});

// @desc return user & token
function returnUserAndToken(user, res){
    jwt.sign(
        {id: user.id},
        config.get('jwt.jwtSecret'),
        {expiresIn: 3600*24},
        (err, token)=>{
            if(err) throw err;

            return res.json({
                token,
                user:{
                    id: user.id,
                    name: user.username,
                    email: user.email
                },
                server: server
            });
        }
    );
}

// @desc return token
function redirectWithToken(user, res){
    jwt.sign(
        {id: user.id},
        config.get('jwt.jwtSecret'),
        {expiresIn: 3600*24},
        (err, token)=>{
            if(err) throw err;
            //console.log('---------------------------/facebook/redirect token: '+config.get('clientURL')+'/?token='+token);
            return res.redirect(config.get('clientURL')+'/?token='+token);
        });
}

// @route GET api/user/details
// @desc response details of the connected user.
// @access Registered users who are logged in
router.get('/user',  auth, function(req,res){
    let user = req.user;
    User.findById(user.id)
        .select('-local -facebookID -googleID -words')
        .then(user=>{
            console.log(user);
            res.json({type: 'GET', user: {id: user._id, username: user.username, email: user.email}});
        });
});

// @route POST auth/signup
// @desc Register new user
// @access public
router.post('/signup', (req, res) => {
    const {username, email, password} = req.body;
    console.log('username: '+username);
    if(!username || !email || !password){
        return res.status(400).json({msg: 'Please fill in all the fields'});
    }
    // if(password !== password2){
    //     return res.status(400).json({msg: 'Password do not match'});
    // }
    if((!password || password.length < 6)) {
        return res.status(400).json({msg: 'Password must be at least 6 characters'});
    }

    User.findOne({ email })
        .then(function (user) {
            if(user){
                console.log('this: '+email+' is already sign up');
                return res.status(400).json({msg:'this email: '+email+' is already sign up'});
            }
            else{
                let cryptPassword;
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(password, salt, (err, hash) => {
                        if(err) throw err;
                        cryptPassword = hash;
                        console.log('create new user');
                        User.create({
                            username: username,
                            email: email,
                            local:{password: cryptPassword}
                        })
                        .then(user =>{
                            returnUserAndToken(user, res);
                        })
                        .catch(err => console.log(err));
                    })
                );
            }
        })
        .catch(function (error) {
            throw(error);
        })
});
// @route POST auth/login
// @desc login for register
// @access public
router.post('/login', (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({msg: 'Please fill in all the fields'});
    }
    passport.authenticate('local', function (err, user, error) {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (error) {
            console.log(error);
            return res.status(400).json(error);
        }
        return returnUserAndToken(user, res, req.headers.origin);
    })(req, res, next);
});

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    return redirectWithToken(req.user, res);
});

router.get('/facebook',  passport.authenticate('facebook', {scope: ['email']}));

// callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    return redirectWithToken(req.user, res);
});
module.exports = router;