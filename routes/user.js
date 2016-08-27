var express = require('express');
var utils = require('../utils');
//创建一个路由容器
var router = express.Router();
//用户注册
router.get('/reg', function(req, res, next) {
  res.render('user/reg');
});
//提交用户注册表单
router.post('/reg', function(req, res, next) {
  var user = req.body;//user password repassword email
  //如果密码和重复密码不一致，则返回重定向到上一个注册表单页面
  if(user.password != user.repassword){
    return res.redirect('back');
  }
  //1. 对密码进行md5加密
  user.password = utils.md5(user.password);
  //2. 通过邮箱生成头像
  user.avatar = "https://secure.gravatar.com/avatar/"+utils.md5(user.email)+"?s=28";
  //通过User可以得到模型对象
  Model('User').create(user,function(err,doc){
    //err 错误对象 doc 是保存成功后的对象
    if(err){
      //如果失败则滚回到上个页面重新填写
      return res.redirect('back');
    }else{
      //如果保存成功了，则把保存后的文档对象写入当前的session中
      req.session.user  = doc;
      //重定向到首页
      return res.redirect('/');
    }
  });
});
//不是完整的路径，而是/users后面的路径
//用户登陆
router.get('/login', function(req, res, next) {
  res.render('user/login');
});

//用户退出
router.get('/logout', function(req, res, next) {
  res.send('退出');
});

module.exports = router;
