var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Users = mongoose.model('Users'),
  crypto = require('crypto');

module.exports = function (app) {
  app.use('/', router);

};


router.get('/login', function (req, res, next) {
  res.render('admin/login', {message:""});
});
router.post('/check_login', function (req, res, next) {
  
	myusername=req.body.username;
	mypassword=req.body.pwd;
	//console.log(username);
	Users.findOne({users_username:myusername,users_password:mypassword},function (err, user_info) {
		if (err) return next(err);	
		if(err){
			 res.render('admin/login',{message:"登陆失败！"});
		}else{
			
			if(user_info){
				req.session.admininfo=user_info;
				res.redirect("/admin/index");
			}else{
				//console.log(user_info);
				 res.render('admin/login',{message:"用户名和密码错误！"});
			}
		}
	})

});
router.get('/logout', function (req, res, next) {
	req.session.admininfo = null;
	res.redirect('/login');//登出成功后跳转到主页
})
router.post('/add_user', function (req, res, next) {
	/*var user_obj={username:req.body.username,password:req.body.pwd};
	Users.create(user_obj,function (err) {
		res.redirect("/login");
	})*/
	var userEntity = new Users();
     userEntity.users_username=req.body.username;
     userEntity.users_password=req.body.pwd;
     userEntity.save(function (err,userInfo){
		res.redirect("/login");
     })
});


/*
function checkNotLogin(req, res, next) {
  if (req.session.user) {
    res.redirect('back');//返回之前的页面
  }
  next();
}*/