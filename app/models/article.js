// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticlesSchema = new Schema({
	//_id:  Schema.Types.ObjectId ,
  articles_title: String,
  articles_url: String,
  articles_text: String,
  createtime:Date,
  author:String,
  articles_category:String,
  articles_click:String,
  articles_date:Date
});

ArticlesSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Articles', ArticlesSchema);

