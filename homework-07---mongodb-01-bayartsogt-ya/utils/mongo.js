const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.MONGO_HOST);

module.exports = client;
