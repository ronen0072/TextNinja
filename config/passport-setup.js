const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const keys = require('./keys');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        console.log('email: '+email);
        // Match user
        User.findOne({
            email: email
        }).then(user => {
            if (!user) {
                return done(null, false, [{ msg: 'That email is not registered' }]);
            }
            if(!user.local.password){
                let error = [];
                if(user.googleID) {
                    error.push({msg: 'this user can log in with Google'});
                }
                if(user.facebookID) {
                    error.push({msg: 'this user can log in with Facebook'});
                }
                if(user.twitterID) {
                    error.push({msg: 'this user can log in with Twitter'});
                }
                console.log(error);
                return done(null, false, error);
            }
            // Match password
            bcrypt.compare(password, user.local.password, (err, isMatch) => {
                if (err){ console.log(err);}
                console.log('isMatch: '+isMatch);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, [{ msg: 'Password incorrect' }]);
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    })
);


passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        /*console.log(profile);*/
        User.findOneAndUpdate(
            {googleID:profile.id},
            {username:profile.displayName, email:profile.emails[0].value, googleID:profile.id},
            {upsert: true, new: true, runValidators: true}, // options
        ).then((user)=>{
                /*console.log('User: '+user);*/
                done(null, user);
            });
    })
);
passport.use(
    new FacebookStrategy({
        // options for facebook strategy
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: '/auth/facebook/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOneAndUpdate(
            {facebookID:profile.id},
            {username:profile.displayName/*, email:profile.emails[0].value*/, facebookID:profile.id},
            {upsert: true, new: true, runValidators: true}, // options
        ).then((user)=>{
            console.log('User: '+user)
            done(null, user);
        });
    })
);