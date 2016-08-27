var express = require('express');
var app = express();
var session = require('express-session');
var flash = require('connect-flash');
app.use(session({
    secret: 'zfpx',
    resave: true,
    saveUninitialized: true
}));
//app.use(flash());
app.use(function (req, res, next) {
    //给请求增加了一个属性叫flash ,参数分别是类型和消息本身
    req.flash = function (type, msg) {
        //如果有msg，则表示赋值，也就是向session中保存数据
        if (msg) {
            var messages = req.session[type];
            //如果已经保存过此session的数据，则往里添加新的元素
            if (messages) {
                messages.push(msg);
            } else {//如果没有保存过，则向直接构建数组赋值
                req.session[type] = [msg];
            }
        } else {//表示取值
            var messages  =  req.session[type];//先暂存值
            delete req.session[type];//清除掉session中的消息
            return messages;//返回刚才的值
        }
    }
    next();
});
/**
 * flash是存储在session中的一段内容
 * 可以多次写
 * 只能读一次
 */
app.get('/write', function (req, res) {
    //传二个参数表示写入消息 1参数是消息的类型 2参数是消息的内容
    req.flash('success', '成功1');//成功的消息会被放在一个数组中
    req.flash('success', '成功2');
    req.flash('error', '失败1');//失败的消息会被放在另一个数组中
    req.flash('error', '失败2');
    res.redirect('/read');
});
app.get('/read', function (req, res) {
    //传一个参数表示读消息,一旦读取完毕之后，会马上清除消息
    var msg = req.flash('success');
    console.log('msg', msg);
    var msg = req.flash('error');
    console.log('msg2', msg);
    res.send(msg);
});

app.listen(9090);