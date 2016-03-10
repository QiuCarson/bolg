var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Categorys = mongoose.model('Categorys');
  Articles = mongoose.model('Articles');
var Paginate = require("../../common/paginate");

module.exports = function (app) {
  app.use('/', router);
};
var pagesize=7;
router.get('/admin*',checkLogin);
router.get('/admin/index', function (req, res, next) {	
  res.render("admin/index");
});
router.get('/admin/articles', function (req, res, next) {
	var page = req.query.p ? parseInt(req.query.p) : 1;
		
	Articles.count(function(err,rs){
		articles_count=rs;
	});
	
	Articles.find(function(err,rs){
		if (err) return next(err);
		articles_list=rs;
		pagehtml=new Paginate(articles_count,pagesize,page);
		res.render("admin/articles",{
		list:articles_list,
		count:articles_count,
		page:page,
		maxpage:Math.ceil(articles_count/pagesize),
		pagehtml:pagehtml.phtml,
		pagesize:pagesize
		});
	}).sort({'_id':-1}).skip((page - 1)*pagesize).limit(pagesize);
	
	
});
router.post('/admin/articles_do', function (req, res, next) {
	title=req.body.articles_title;
})

router.get('/admin/articles_add', function (req, res, next) {
  /***À¸Ä¿*****/
	Categorys.find({categorys_name:{$ne:null}},function (err, rs) {
		if (err) return next(err);	
		categorys=rs;
		//console.log(req.session.admininfo.users_password);
		res.render("admin/articles_add",{categorys:categorys,author:req.session.admininfo.users_username});
	});
  
});
router.post('/admin/articles_add_do', function (req, res, next) {
	title=req.body.articles_title;
	text=req.body.articles_text;
	author=req.body.author;
	category=req.body.articles_category;
	obj={articles_title:title,
	  articles_text:text,
	  author:author,
	  articles_category:category,
		createtime:new Date()
	};

	Articles.create(obj,function(err){
		if (err) return next(err);
		res.redirect("/admin/articles");
	})
  
});


list='';
count='';
categorys_count='';
categorys_list='';

router.get('/admin/categorys', function (req, res, next) {
	var page = req.query.p ? parseInt(req.query.p) : 1;
	//console.log(page);
	Categorys.count(function(err,rs){
		//console.log(rs);
		categorys_count=rs;
	});
	Categorys.find(function(err,rs){
		if (err) return next(err);
		//console.log(rs);
		categorys_list=rs;
		pagehtml=new Paginate(categorys_count,pagesize,page);
		res.render("admin/categorys",{
			list:categorys_list,
			count:categorys_count,
			page:page,
			maxpage:Math.ceil(categorys_count/pagesize),
			pagehtml:pagehtml.phtml,
			pagesize:pagesize
		});
	}).sort({'_id':-1}).skip((page - 1)*pagesize).limit(pagesize);
	
	
});
router.get('/admin/categorys_add', function (req, res, next) {
  res.render("admin/categorys_add");
});
router.post('/admin/categorys_add_do', function (req, res, next) {
  name=req.body.categorys_name;
  url=req.body.categorys_url;
  keyword=req.body.categorys_keyword;
  discription=req.body.categorys_discription;
  obj={categorys_name:name,
	  categorys_url:url,
	  categorys_keyword:keyword,
	  categorys_discription:discription
	  };
 // console.log(req.body);
  Categorys.create(obj,function(err){
	if (err) return next(err);
	res.redirect("/admin/categorys");
  })
});



function checkLogin(req, res, next) {	
  if (!req.session.admininfo) {
    //res.redirect('/login');
  }
  next();
}

