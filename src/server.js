require('dotenv').config();
const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require("method-override")
const session = require('express-session');
const cors = require("cors");
// Inicializacciones
const app = express();

//Setting
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs", 
    exphbs({
        defaultLayout: "Main",
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs',
})
);
app.set("view engine", ".hbs")


const log = console.log;

//Middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized: true
}))

require('./database')




//Global Variables


//Routes
app.use(require('./routes/index'));
app.use(('/notes'), require('./routes/notes'));
app.use(('/users'), require('./routes/users'));



//Static Files
app.use('/public', express.static(path.join(__dirname, 'public')));


// Server is listening
app.listen(app.get("port"), () => {
    log("Server on port", app.get('port'));
}) 

