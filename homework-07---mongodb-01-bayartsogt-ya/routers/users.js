// imports
const express = require('express');
const multer = require('multer');
const students = require('../json_db/students');
const router = express.Router();
const path = require('path');

// mongo
const client = require('../utils/mongo');

// init
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../assets/pics'));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

const cpUpload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1000 * 1000,
    },
    fileFilter: function (req, file, cb) {
        if (
            ['.jpg', '.jpeg'].includes(
                path.extname(file.originalname).toLowerCase()
            )
        ) {
            return cb(null, true);
        }
        console.log('WRONG EXTENSION');
        cb(null, false);
    },
}).fields([{ name: 'image', maxCount: 1 }]);

// middleware that is specific to this router
router.get('/', function (req, res) {
    console.log('get student');
    const collection = client.db('homework07').collection('Students');
    collection.findOne({}, function (err, doc) {
        res.json(doc);
    });
});

router.get('/search/:name', function (req, res) {
    const queryName = req.params.name;
    console.log(`query: ${queryName}`);

    const collection = client.db('homework07').collection('Students');
    collection.findOne({ name: { $regex: queryName } }, function (err, doc) {
        if (doc != null) {
            res.json({ success: true, result: doc });
        } else {
            res.json({ success: false, result: doc });
        }
    });
});

router.post('/', cpUpload, function (req, res) {
    console.log('Working in POST');
    console.log(req.body);
    res.json({ msg: 'Created User' });
});

router.delete('/delete/:_id', function (req, res) {
    const queryID = req.params._id;
    console.log(`DELETE REQUEST FOR USER: ${queryID}`);
    res.json({ msg: 'Deleted User' });
});

module.exports = router;
