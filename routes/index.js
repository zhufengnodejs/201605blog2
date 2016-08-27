var express = require('express');
//创建一个路由容器
var router = express.Router();

//当访问首页的时候，直接跳转到文章列表页面
router.get('/', function (req, res, next) {
    res.redirect('/article/list');
});

module.exports = router;
