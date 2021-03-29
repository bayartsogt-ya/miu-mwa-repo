// deps
const express = require('express');
const userRoute = require('./routers/users');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

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
app.listen(3000, () => console.log(`listening in 3000`));
