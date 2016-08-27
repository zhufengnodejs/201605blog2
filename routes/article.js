var express = require('express');
var auth = require('../middleware/auth');
//创建一个路由容器
var router = express.Router();
router.get('/add',auth.mustLogin,function(req,res){
    res.render('article/add');
});
module.exports = router;