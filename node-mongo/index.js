const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect (url, (err, client) => {

    assert.equal(err, null);

    console.log("Connected correctly to the db");

    const db = client.db(dbname);

    dboper.insertDocument(db, {name: "Vadonut", description: "Test"}, "dishes", (result) => {
             console.log('Insert document:\n', result.ops);

             dboper.findDocuments(db, 'dishes', (docs) => {
                 console.log('Found Documents:\n', docs);

                 dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, 'dishes', (result) => {
                     console.log("Updated document:\n", result.result);
                 
                     dboper.findDocuments(db, 'dishes', (docs) => {

                        console.log('Found Documents:\n', docs);
                        db.dropCollection("dishes", (result) => {
                        console.log("Dropped collection", result);

                        client.close();
                       });
                    });
                 });
             });
       });
});


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