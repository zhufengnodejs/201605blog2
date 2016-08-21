var express = require('express');
//创建一个路由容器
var router = express.Router();
router.get('/add',function(req,res){
    res.render('article/add');
});
module.exports = router;