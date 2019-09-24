const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOneAndUpdate(
            {googleID:profile.id},
            {username:profile.displayName, email:profile.emails[0].value, googleID:profile.id},
            {upsert: true, new: true, runValidators: true}, // options
        ).then((user)=>{
                console.log('User: '+user)
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
/*        User.findOneAndUpdate(
            {facebookID:profile.id},
            {username:profile.displayName, email:profile.emails[0].value, facebook:profile.id},
            {upsert: true, new: true, runValidators: true}, // options
        ).then((user)=>{
            console.log('User: '+user)
            done(null, user);
        });*/
    })
);