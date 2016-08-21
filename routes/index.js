var express = require('express');
//创建一个路由容器
var router = express.Router();

/* 设置路由 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
