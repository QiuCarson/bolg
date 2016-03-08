// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OptionsSchema = new Schema({
  options_names: String,
  options_values: String
});

OptionsSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Options', OptionsSchema);

