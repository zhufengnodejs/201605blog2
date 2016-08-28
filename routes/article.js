var express = require('express');
var auth = require('../middleware/auth');
var markdown = require('markdown').markdown;
//创建一个路由容器
var router = express.Router();
//文章列表路由
router.get('/list',auth.mustLogin,function(req,res){
    var user = req.query.user;//取得查询字符串中的用户ID
   //读取所有的列表并显示在页面中
    var query = {};//查询条件对象
    if(user)
        query['user'] = user;
   Model('Article').find(query).populate('user').exec(function(err,docs){
       if(err){
           req.flash('error','显示文章列表失败'+err);
           res.redirect('back');
       }else{
           //把markdown源文件转换成html格式的内容
           docs.forEach(function(doc){
               doc.content = markdown.toHTML(doc.content);
           });
           //docs是所有的文章数组
           res.render('article/list',{title:'文章列表',articles:docs});
       }

   });
});

//显示增加文章的表单路由
router.get('/add',auth.mustLogin,function(req,res){
    //新增加文章的时候article是空对象
    res.render('article/add',{title:'新增文章',article:{}});
});

router.post('/add',auth.mustLogin,function(req,res){
    //从请求体中得到文档对象
    var article = req.body;
    var articleId = article._id;
    if(articleId){//如果ID有值表示修改文章
        Model('Article').update({_id:articleId},{$set:{
            title:article.title,//能且只能更新title和content两个字段
            content:article.content//指定修改后的内容
        }}).then(function(result){
            res.redirect('/article/detail/'+articleId);
        });
    }else{//如果ID没有值表示新增加文章
          //从会话对象session中取出userId,赋给文章的发表人字段
        article.user = req.session.user._id;
        //因为新增的时候_id传过来的是空字符串，因为_id主键不能为空,所以要删除此字段
        // 因为如果_id不值的话,mongodb会直接保存
        //如果_id为null,mongodb会帮我们自动生成一个合法_id值
        delete article._id;
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
    }

});

router.get('/detail/:articleId',function(req,res){
  var articleId = req.params.articleId;
  //find findById findOne等等都返回一个promise对象
  Model('Article').findById(articleId).then(function(doc){
      res.render('article/detail',{title:'文章详情',article:doc});
  }).catch(function(err){
      req.flash('error','查询文章详情失败');
      req.redirect('back');
  });
});
//删除文章
router.get('/delete/:articleId',function(req,res){
  //先得到要删除的文章ID
  var articleId = req.params.articleId;
  //删除指定的文章
  Model('Article').remove({_id:articleId}).then(function(data){
      req.flash('success','删除文章成功');
      res.redirect('/');
  },function(error){
      req.flash('error','删除文章失败');
      res.redirect('back');
  });
});
/**
 * 1. 点击编辑链接跳到增加文章的页面，并且回显文章原来的内容
 * 2. 进行修改编辑，修改完成后保存文章
 */
router.get('/update/:articleId',function(req,res){
    //先得到要编辑的文章ID
    var articleId = req.params.articleId;
    //根据文章的ID查询文章的文档对象
    Model('Article').findById(articleId).then(function(doc){
        //渲染模板，并传递当前的文章对象
        res.render('article/add',{title:'编辑文章',article:doc});
    })
});
module.exports = router;