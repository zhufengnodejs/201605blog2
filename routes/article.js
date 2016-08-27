var express = require('express');
var auth = require('../middleware/auth');
//创建一个路由容器
var router = express.Router();
router.get('/add',auth.mustLogin,function(req,res){
    res.render('article/add');
});

router.post('/add',auth.mustLogin,function(req,res){
    //从请求体中得到文档对象
    var article = req.body;
    //从会话对象session中取出userId,赋给文章的发表人字段
    article.user = req.session.user._id;
    //把此文件存放到数据库里
    Model('Article').create(article,function(err,doc){
        if(err){
            req.flash('error','文章发表失败了');
            res.redirect('back');
        }else{
            req.flash('success','文章发表成功');
            res.redirect('/');
        }
    });
});
module.exports = router;