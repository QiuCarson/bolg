// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CategorysSchema = new Schema({
  categorys_name: String,
  categorys_url: String,
  categorys_keyword: String,
  categorys_discription: String,
});

CategorysSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Categorys', CategorysSchema);

