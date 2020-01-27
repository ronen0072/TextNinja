const express = require('express');
//const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeControllers = require('./controllers/homeControllers');
const cookieSession = require('cookie-session');
const passport = require('passport');
const routesAPI = require('./routes/api');
const routesAuth = require('./routes/auth');
const routesPractice = require('./routes/practice');
var session = require('express-session');
const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');

const app = express();



//set the template engine
//app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(cookieSession({
    maxAge:24*60*60*1000,
    /*maxAge:1*60*1000,*/
    keys:[keys.session.cookieKey]
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
mongoose.connect("mongodb://localhost/textNinja", () => {
    console.log('connected to mongodb');
});


app.use(bodyParser.json());
app.use('/', require('./routes/index.js'));
app.use('/api', routesAPI);
app.use('/auth', routesAuth);
app.use('/practice', routesPractice);

//static files
app.use(express.static('./public'));

/*homeControllers(app);*/


//listen to port
app.listen(process.env.port || 3000);
console.log('Text Ninja listen to port 3000');
