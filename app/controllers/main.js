var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Categorys = mongoose.model('Categorys');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/admin*',checkLogin);
router.get('/admin/index', function (req, res, next) {
	
  res.render("admin/index");
});
router.get('/admin/articles', function (req, res, next) {
  res.render("admin/articles");
});

router.get('/admin/articles_add', function (req, res, next) {
  res.render("admin/articles_add");
});
router.get('/admin/categorys', function (req, res, next) {
	var page = req.query.p ? parseInt(req.query.p) : 1;
	console.log(page);

	Categorys.find(function(err,rs){
		if (err) return next(err);
		console.log(rs);
	}).skip((page - 1)*1).limit(1);
	Categorys.count(function(err,rs){
		console.log(rs);
	});
	res.render("admin/categorys");
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
  console.log(req.body);
  Categorys.create(obj,function(err){
	if (err) return next(err);
	res.redirect("/admin/categorys");
  })
});



function checkLogin(req, res, next) {
	console.log(req.session.admininfo);
  if (!req.session.admininfo) {
    //res.redirect('/login');
  }
  next();
}
