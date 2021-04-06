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
            req.db = db.collection('zips');
            next();
        });
    } else {
        req.db = db.collection('zips');
        next();
    }
});

app.get('/', async (req, res) => {
    const data = await req.db.findOne({});
    res.json(data);
});

app.get('/all_zip_code', async (req, res) => {
    let data = await req.db
        .aggregate([
            {
                $group: { _id: '$_id' },
            },
        ])
        .toArray();

    console.log(data);

    res.json({
        first_zip: data[0],
        len_zips: data.length,
        comment: 'sending first element for simplicity',
    });
});

app.get('/zip_code_less_than/:population', async (req, res) => {
    const max_population = parseInt(req.params.population);

    let data = await req.db
        .aggregate([
            {
                $match: { pop: { $lt: max_population } },
            },
        ])
        .toArray();

    // console.log(data);

    res.json({
        first_zip: data[0],
        len_zips: data.length,
        comment: 'sending first element for simplicity',
    });
});

app.get('/cities_more_than_one_zip_code', async (req, res) => {
    let data = await req.db
        .aggregate([
            {
                $group: { _id: '$city', num_zips: { $sum: 1 } },
            },
            { $match: { num_zips: { $gte: 2 } } },
            { $project: { _id: 0, city: '$_id', num_zips: 1 } },
        ])
        .toArray();

    // console.log(data);

    res.json({
        first_zip: data[0],
        len_zips: data.length,
        comment: 'sending first element for simplicity',
    });
});

app.get('/get_least_populated_city', async (req, res) => {
    let data = await req.db
        .aggregate([
            {
                $group: {
                    _id: { state: '$state', city: '$city' },
                    sum_pop: { $sum: '$pop' },
                },
            },
            {
                $project: {
                    _id: 0,
                    state: '$_id.state',
                    city: '$_id.city',
                    sum_pop: 1,
                },
            },
            { $sort: { sum_pop: -1 } },
            { $limit: 1 },
        ])
        .toArray();

    res.json({
        data,
    });
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {},
    });
});

app.listen(3000, () => console.log('listening to 3000'));
