// imports
const express = require('express');
const multer = require('multer');
const students = require('../json_db/students');
const router = express.Router();
const path = require('path');

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
    res.json(students);
});

router.post('/', cpUpload, function (req, res) {
    console.log('Working in POST');
    res.json(students);
});

router.delete('/', function (req, res) {
    res.json(`deleted ${students.pop()}`);
});

module.exports = router;
