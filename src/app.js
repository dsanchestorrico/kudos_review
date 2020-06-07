const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//settings
app.set('port', 3000);
app.set('json spaces',2);

//connecting to db
mongoose.connect('mongodb://localhost:27017/kudos')
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/api'));

//iniciando el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});