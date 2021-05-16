require('dotenv').config();
const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require("method-override")
const session = require('express-session');
const flash = require('connect-flash');
const cors = require("cors");
const passport = require('passport');
// Inicializacciones
const app = express();
require('./database')
require('./config/passport');

//Setting
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs", 
    exphbs({
        defaultLayout: "Main",
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'components'),
        extname: '.hbs',
})
);
app.set("view engine", ".hbs")
const log = console.log;

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors());
app.use(session({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.delete_msg = req.flash('delete_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;

    next();
})

//Routes
app.use(require('./routes/index'));
app.use('/notes', require('./routes/notes'));
app.use('/users', require('./routes/users'));

//Static Files
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.render('Error');
});

// Server is listening
app.listen(app.get("port"), () => {
    log("Server on port", app.get('port'));
}) 

