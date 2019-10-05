const passport = require('passport');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var session = require('express-session');
const {updateCurrentPageName} = require('../config/redirectBack');


router.get('/logOut', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/login', (req, res) => {
    req.pageID = 0;
    res.redirect('/');

});


router.post('/signup', (req, res) => {
    const pageName = (req.session.pageName !== undefined)? req.session.pageName : 'home';
    const {username, email, password, password2} = req.body;
    let signUp = true, login = true;
    console.log('username: '+username);
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
    if(errors.length === 0) {
        console.log('errors.length === 0');
        User.findOne({email:email})
            .then(function (user) {
                if(user){
                    console.log('this: '+email+' is already sign up');

                    errors.push({msg:'this: '+email+' is already sign up'});
                    res.render('pages/'+pageName,{
                        errors,
                        username,
                        email,
                        password,
                        password2,
                        signUp
                    });
                }
                else{
                    let cryptPassword;
                    bcrypt.genSalt(10,(err,salt) =>
                        bcrypt.hash(password,salt,(err,hash) => {
                            if(err) throw err;
                            cryptPassword = hash;
                            console.log('create new user');
                            User.create({
                                username: username,
                                email: email,
                                local:{password: cryptPassword}
                            })
                                .then(function (){
                                    res.render('pages/'+pageName,{
                                        errors,
                                        email,
                                        login
                                    });
                                })
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
        res.render('pages/'+pageName,{
            errors,
            username,
            email,
            signUp
        });
    }

});
router.post('/login', (req, res, next) => {
    const pageName = (req.session.pageName !== undefined)? req.session.pageName : 'home';
    const {email, password} = req.body;
    let login = true;
    let errors = [];
    if(!email || !password){
        errors.push({msg: 'Please fill in all the fields'});
    }
    console.log(errors);
    if(errors.length === 0) {
        passport.authenticate('local', function (err, user, errors) {
            if (err) { return next(err); }
            if (!user) {
                return res.render(
                    'pages/'+pageName,{
                        login,
                        errors,
                        email
                    });
            }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.send({type: 'POST', login: true});
            });
        })(req, res, next);
        /* {
            successRedirect: '/about',
            failureRedirect: '/',
            failureFlash: false
        })(req, res, next);*/
    }
    else{
        console.log(errors);
        console.log('not pass');
        res.render('pages/'+pageName,{
            login,
            errors,
            email
        });
    }

});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    /*console.log('redirect: '+req.session.pageID);*/
    res.redirect('/');
});

router.get('/facebook',  passport.authenticate('facebook'/*, {
    scope: ['profile', 'email']
}*/));

// callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    /*console.log('redirect pageID: '+req.session.pageID);*/
    res.redirect('/');
});
module.exports = router;