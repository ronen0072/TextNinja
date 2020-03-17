const express = require('express');
const fileUpload  = require('express-fileupload');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const config = require('config');
const cookieSession = require('cookie-session');
const passport = require('passport');
const routesAPI = require('./routes/api');
const routesAuth = require('./routes/auth');
var session = require('express-session');
const passportSetup = require('./config/passport-setup');
const path = require('path');

const app = express();

app.use(fileUpload());
app.use(cookieSession({
    maxAge:24*60*60*1000,
    /*maxAge:1*60*1000,*/
    keys:[config.get('session.cookieKey')]
}));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.promise = global.Promise;

//connect to mongodb
connectDB();


app.use(express.json());
app.use('/api', routesAPI);
app.use('/auth', routesAuth);


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

