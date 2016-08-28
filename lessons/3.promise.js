var fs = require('fs');
function readFile(filename) {
    /**
     * promise 最初的状态是初始态
     * 调用resolve表示成功了，就会把状态改为成功态
     * 调用reject表示失败了，就会把状态改为失败态
     */
    return new Promise(function (resolve, reject) {
        //当创建promise实例的时候，此函数就开始执行
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}
//promise的链式调用 在于在回调里返回一个新的promise
readFile('1.txt')
.then(function (data) {//2.txt
    return readFile(data);
})
.then(function (data) { //3.txt
    return readFile(data);
})
.then(function (data) {//3
    console.log(data);
})
//不管这个链条中有任何一个环节出错了，就会调用catch方法
.catch(function(error){
    console.log(error);
});