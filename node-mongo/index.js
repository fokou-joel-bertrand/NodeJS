const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect (url)

    .then((client) => {

            console.log("Connected correctly to the db");

            const db = client.db(dbname);

            dboper.insertDocument(db, {name: "Vadonut", description: "Test"}, "dishes")

    .then((result) => {
             console.log('Insert document:\n', result.ops);

             return dboper.findDocuments(db, 'dishes');
     })

    .then((docs) => {

            console.log('Found Documents:\n', docs);

            return dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, 'dishes');
    })

    .then((result) => {
                     console.log("Updated document:\n", result.result);
                 
            return dboper.findDocuments(db, 'dishes')
    })

    .then((docs) => {

            console.log('Found Documents:\n', docs);
            return db.dropCollection("dishes")
    })

    .then((result) => {

            console.log("Dropped collection", result);
            client.close();
    })

    .catch((err) => console.log(err));
    
 })
   .catch((err) => console.log(err));


/* MongoClient.connect(url, (err, client) => {
   
    assert.equal(err, null);
    console.log('Connected correctly to the server.');

    const db = client.db(dbname);
    const collection = db.collection('dishes');
    collection.insertOne({"name" : "Uthapizzar", "Description":"test"}, (err, result) => {
        assert.equal(err, null);
        console.log('After insert:\n');
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);
            console.log('Found:\n');
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);

                client.close();
            });
        });
    });
});*/