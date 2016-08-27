/**
 * 连接数据库
 * 定义骨架+模型
 */
var mongoose = require('mongoose');
var settings= require('../settings');
var ObjectId = mongoose.Schema.Types.ObjectId;
//连接数据库  mongodb:/主机名或IP/数据库
mongoose.connect(settings.dbUrl);
//定义模型骨架 定义集合的字段和类型以及约束
//用户的模型骨架
var UserSchema = new mongoose.Schema({
    username: String, //用户名
    password: String, //密码(要先md5加密之后再保存)
    email: String,    //邮箱
    avatar: String    //头像
});
var UserModel = mongoose.model('User',new UserSchema());
//文章的模型骨架
var ArticleSchema = new mongoose.Schema({
    title: String,  //标题
    content: String, //正文
    user: {type: ObjectId, ref: 'User'}, //发表文章的用户
    createAt: {type: Date, default: Date.now()}//创建时间
});
//两个参数表示定会义一个模型，一个参数表示获取一个模型
var ArticleModel = mongoose.model('Article',new ArticleSchema());
//在全局对象上定义一个方法属性，传入一个模型名称，返回此名称对应的模型
global.Model = function(modelName){
   return mongoose.model(modelName);
}

