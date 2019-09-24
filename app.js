const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeControllers = require('./controllers/homeControllers');
const cookieSession = require('cookie-session');
const passport = require('passport');
const routesAPI = require('./routes/api');
const routesAuth = require('./routes/auth');
const routesPractice = require('./routes/practice');
const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');

const app = express();

//set the template engine
app.set('view engine', 'ejs');
app.use(cookieSession({
    /*maxAge:24*60*60*1000,*/
    maxAge:5*60*1000,
    keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session())


mongoose.promise = global.Promise;

//connect to mongodb
mongoose.connect("mongodb://localhost/textNinja", () => {
    console.log('connected to mongodb');
});


app.use(bodyParser.json());
app.use('/api', routesAPI);
app.use('/auth', routesAuth);
app.use('/practice', routesPractice);

//static files
app.use(express.static('./public'));

homeControllers(app);


//listen to port
app.listen(process.env.port || 3000);
console.log('Text Ninja listen to port 3000');
