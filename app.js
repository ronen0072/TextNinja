const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeControllers = require('./controllers/homeControllers');
const cookieSession = require('cookie-session');
const passport = require('passport')
const routesAPI = require('./routes/api');
const routesAuth = require('./routes/auth');
const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');

const app = express();

//connect to mongodb
mongoose.connect("mongodb://localhost/textNinja");
mongoose.promise = global.Promise;

app.use(bodyParser.json());
app.use('/api', routesAPI);
app.use('/auth', routesAuth);

//set the template engine
app.set('view engine', 'ejs');
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session())

//static files
app.use(express.static('./public'));

homeControllers(app);


//listen to port
app.listen(process.env.port || 3000);
console.log('Text Ninja listen to port 3000');
