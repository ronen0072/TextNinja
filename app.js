const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeControllers = require('./controllers/homeControllers');
const routes = require('./routes/api');
const app = express();

//connect to mongodb
mongoose.connect("mongodb://localhost/textNinja");
mongoose.promise = global.Promise;

app.use(bodyParser.json());
app.use('/api', routes);

//set the template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

homeControllers(app);


//listen to port
app.listen(process.env.port || 3000);
console.log('Text Ninja listen to port 3000');
