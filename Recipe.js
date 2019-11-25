const mongoose = require('mongoose');
const db = 'mongodb+srv://ShuenChai:12345@cluster0-tqflq.mongodb.net/recipe?retryWrites=true&w=majority';

//Connect to MongoDB database
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  food: { type: Array }
});

const searchSchema = mongoose.Schema({
  search : {type: String},
  created : {type: String}
})

const Recipe = mongoose.model('Recipe', schema, 'recipeCollection');
const search = mongoose.model('search_history', searchSchema, 'search_history');

module.exports.Recipe = Recipe;
module.exports.search = search;
