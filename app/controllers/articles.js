var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Options = mongoose.model('Options'),
  Categorys = mongoose.model('Categorys'),
  Navigations = mongoose.model('Navigations'),
  Articles = mongoose.model('Articles');

module.exports = function (app) {
	
  app.use('/', router);
};
rs_index_options_keyword='';
rs_index_options_title='';
options_title='';
options_keyword='';
rs_index_options_description='';
options_description='';
rs_categorys='';
categorys='';

articles='';
rs_articles='';


/***栏目*****/
	Categorys.find(function (err, categorys) {
		if (err) return next(err);	
		rs_categorys=categorys;
	});
console.log(rs_categorys);
navigations='';
rs_navigations='';
/***导航***/
	Navigations.find(function (err, navigations) {
		if (err) return next(err);	
		rs_navigations=navigations;
		
	});
/***日期**/
articles_right_date='';
rs='';
Articles.find(function (err, rs){
	if (err) return next(err);
	articles_right_date=rs;
} ).distinct("articles_date");



router.get('/articles/:articles_id', function (req, res, next) {


  Options.findOne({options_names:"index_options_title"},function (err, index_options_title) {
    if (err) return next(err);
	if(index_options_title){
		
		rs_index_options_title=index_options_title.options_values;
		
	}
  });

  Options.findOne({options_names:"index_options_keyword"},function (err, index_options_keyword) {
    if (err) return next(err);
	if(index_options_keyword){
		rs_index_options_keyword=index_options_keyword.options_values;
	}
	
  });

  Options.findOne({options_names:"index_options_discription"},function (err, index_options_description) {
    if (err) return next(err);	
	
	if(index_options_description){
		rs_index_options_description=index_options_description.options_values;
		
	}
  });
  console.log(req.params.articles_id);

	//文章
	/*Articles.findOne({_id:req.params.articles_id},function (err, articles) {
		if (err) return next(err);	
		rs_articles=articles;
	});*/
	//obj="ObjectId(56df86c231fbb16c1e5cce7d)";
	//id=mongoose.Schame.ObjectId(req.params.articles_id);
	//var id=new ObjectID("56df86c231fbb16c1e5cce7d");
	//var ObjectID = require('mongoose').ObjectID;
	//var id=Articles.Types.ObjectId("56df86c231fbb16c1e5cce7d");
	
	//id="56df86c231fbb16c1e5cce7d";
	id=req.params.articles_id;
	console.log(id);

	/*Articles.findById(id,function (err, articles) {
		if (err) return next(err);
		//console.log(articles);
		rs_articles=articles;
	});*/
	Articles.findOne({_id:id},function(err, articles){
		rs_articles=articles;
		//console.log(articles.articles_category);
	})
console.log(rs_articles);
  res.render('articles', {
      options_keyword: rs_index_options_keyword,
	  options_title: rs_index_options_title,
	  options_description: rs_index_options_description,
	  categorys: rs_categorys,
	  articles: rs_articles,
	  navigations: rs_navigations,
	  articles_right_date:articles_right_date
   });
  
 
   
});
