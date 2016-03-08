// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var NavigationsSchema = new Schema({
  navigations_names: String,
  navigations_url: String
});

NavigationsSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Navigations', NavigationsSchema);

