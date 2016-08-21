var express = require('express');

var path = require('path');//处理文件路径的 join resolve
var favicon = require('serve-favicon');//处理收藏夹图标
var logger = require('morgan');//是一个请求日志打印工具
var cookieParser = require('cookie-parser');//处理cookie  增加 req.cookies属性
var bodyParser = require('body-parser');//处理请求体

var routes = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
var app = express();

// view engine setup  设置模板引擎
app.set('views', path.join(__dirname, 'views'));//设置模板存放目录
app.set('view engine', 'html');//设置模板引擎
app.engine('html',require('ejs').__express);//设置渲染函数

// uncomment after placing your favicon in /public
// 在你将收藏夹图标放置在/public目录下之后就可以取消掉此注释了
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//使用请求日志中间件
//通过判断请求头中的content-type来得到请求体的内容类型
//如果是content-type=application/json req.body=JSON.parse(请求体)
app.use(bodyParser.json());//处理json格式请求体 {name:'zfpx'}
//用来处理urlencoded请求体 name=zfpx&age-6
//如果content-type=application/x-www-form-urlencoded  req.body=querystring.parse(请求体)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());//处理cookie 得到 req.cookies
//静态文件中间件
app.use(express.static(path.join(__dirname, 'public')));

//当路径是/开头的话交由routes处理
app.use('/', routes);
//当路径/users开头的话交由users
app.use('/user', user);
app.use('/article', article);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
