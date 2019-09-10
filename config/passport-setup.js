const passport = require('passport');
const GoogleStrategy = require('passport-google_oauth20');
const keys = require('./keys');

passport.use(
    new GoogleStrategy({
        callbackURL:'/auth/google/redirecr',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }),()=>{

    }
)