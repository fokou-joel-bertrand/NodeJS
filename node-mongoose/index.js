const mongoose = require('mongoose');

const Dishes = require('./models/dishes.js');

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);


connect.then((db) => {
    console.log("Connected correctly to server");

        Dishes.create({
            name: 'Uthappizza 2',
            description: 'test 1'
        })
       .then(dish => {
           console.log(dish)

          return Dishes.findByIdAndUpdate(dish._id, {
              $set: { description: 'updated test'}
           },{
              new: true
          }).exec();
       })
       .then(dish => {
           console.log(dish);

           dish.comments.push({
               rating: 5,
               comment: 'I am the comment',
               author: 'Fokou Joel'     
           });
        
           return dish.save();

           })
           .then((dish) => {

              console.log(dish);

           return Dishes.deleteMany({});
       })
       .then(() => {
           return mongoose.connection.close();
       })
       .catch((err) => {
           console.log(err);
       });
});


/*connect.then((db) => {
    console.log("Connected correctly to server");

    const newDish = Dishes({
        name: 'Uthappizza',
        description: 'test'
    });
    

    newDish.save()
       .then(dish => {
           console.log(dish)

          return Dishes.find({}).exec();
       })
       .then(dishes => {
           console.log(dishes);

           return Dishes.deleteMany({});
       })
       .then(() => {
           return mongoose.connection.close();
       })
       .catch((err) => {
           console.log(err);
       });
});*/

