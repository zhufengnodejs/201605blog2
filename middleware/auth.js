// 要求必须未登陆才能继续向下执行，如果已经登陆则不能继续，跳到首页
//这是一个权限判断的中间件
exports.mustNotLogin = function (req, res, next) {
    //如果req.session.user有值， 则认为此用户已经登录
    if (req.session.user) {
        req.flash('error', '此页面需要未登陆才能访问，你已经登录过了');
        res.redirect('/');
    } else {
        next();
    }
}
//此中间件要求登陆之后才能访问
exports.mustLogin = function (req, res, next) {
    //如果req.session.user有值， 则认为此用户已经登录
    if (req.session.user) {
        next();
    } else {
        req.flash('error', '此页面需要登陆后才能访问，你尚未登录，请登陆');
        res.redirect('/user/login');
    }
}