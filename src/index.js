const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override')
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db')

//Connect to DB
db.connect({useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'))

//HTTP logger
// app.use(morgan('combined'));

// TEMPLATE ENGINE
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));
// console.log(__dirname);

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
