const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const cors = require("cors");
const app = express();
const watchController = require('./watchController');

// using Cors by port 8081 alternative
let corsOptions = {
    origin: "http://localhost:8081"
};

// using Cors Options
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
// Static Files
//app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// route for the json file from the database
app.get('/', watchController.view);
// route for the admin page to add new watches to the database
app.post('/admin', watchController.create);


const routes = require('./server/routes/watch');
app.use('/', routes);

// using port 8080 for admin-site
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Templating Engine
app.engine('hbs', exphbs.engine( {extname: '.hbs' }));
app.set('view engine', 'hbs');