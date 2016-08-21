var express = require('express');
//创建一个路由容器
var router = express.Router();
router.get('/add',function(req,res){
    res.send('发表文章');
});
modules.exports = router;