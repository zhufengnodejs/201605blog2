/**
 * 1. 如果一个方法需要在很多地方使用
 * @param str
 * @returns {*}
 */
exports.md5 = function(str){
    //用md5算法对传入的参数进行加密，并输出十六进制字符串
    return require('crypto')
        .createHash('md5')
        .update(str)
        .digest('hex');
}