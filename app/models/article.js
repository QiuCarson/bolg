// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticlesSchema = new Schema({
	//_id:  Schema.Types.ObjectId ,
  articles_title: {type:String,required: true},
  articles_url: String,
  articles_text: String,
  createtime:{type:Date, default: Date.now},
  author:String,
  articles_category:String,
  articles_click:String,
  articles_date:Date,
  orderby:{type: Number},
});

ArticlesSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Articles', ArticlesSchema);

