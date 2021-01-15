 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const commentSchema = new Schema({
     rating: {
         type: Number,
         min: 1,
         max: 5,
         required: true
     },
     comment: {
         type: String,
         required: true
     },
     author: {
         type: String,
         required: true
     }
    },{
        timestamps: true
 });

 const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [ commentSchema ]
},{
    timestamps: true
});

 const Dishes = mongoose.model('Dish', dishSchema);

 module.exports = Dishes;

















/*Dishes.create({
    name: 'Uthappizza',
    description: 'test'
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
*/

