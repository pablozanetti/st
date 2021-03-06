require('./config/config.js');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/item'));

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('DB online');
});

app.listen(process.env.PORT, () => {
    console.log('Listening port: ', process.env.PORT);
})