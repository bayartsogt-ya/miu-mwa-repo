const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let db;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    if (!db) {
        client.connect(function (err) {
            db = client.db('rich');
            req.db = db.collection('locations');
            next();
        });
    } else {
        req.db = db.collection('locations');
        next();
    }
});

app.get('/', (req, res) => {
    req.db.find({}).toArray((err, data) => res.json(data));
});

app.delete('/clear', async (req, res) => {
    await req.db.removeMany({});
    await req.db.createIndex({ location: '2d' });
    req.db.find({}).toArray((err, data) => res.json(data));
});

app.post('/fill', async (req, res) => {
    await req.db.insertMany(req.body);
    await req.db.createIndex({ location: '2d' });
    req.db.find({}).toArray((err, data) => res.json(data));
});

app.post('/nearest', (req, res) => {
    req.db
        .find({
            location: {
                $near: req.body.location,
            },
        })
        .limit(3)
        .toArray((err, data) => res.json(data));
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {},
    });
});

app.listen(3000, () => console.log('listening to 3000'));
