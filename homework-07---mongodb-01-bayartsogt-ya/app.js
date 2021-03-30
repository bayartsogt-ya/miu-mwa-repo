// deps
require('dotenv').config();
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// local deps
const client = require('./utils/mongo');
const userRoute = require('./routers/users');

// init
const app = express();
var accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs', 'access.log'),
    { flags: 'a' }
);

// configs
app.disable('etag');
app.disable('x-powered-by');

// middleware
app.use(cors());
app.use(morgan('combined', { stream: accessLogStream }));
app.use('/picture', express.static(path.join(__dirname, 'assets/pics')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/users', userRoute);

// error handling
app.use((err, req, res, next) => {
    console.log(err);
});

// bootup

app.on('ready', function () {
    app.listen(3000, () => console.log(`listening in 3000`));
});

// after connection start server

client.connect(function (err) {
    console.log('DB Connected!');
    app.emit('ready');
});
