// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UsersSchema = new Schema({
  users_username: String,
  users_password: String
});

UsersSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Users', UsersSchema);

