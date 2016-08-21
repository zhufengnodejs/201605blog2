module.exports = function(name){
    /**
     * 读取环境变量中的DEBUG值，如果和自己的名字一样，则输出msg
     * 如果不一样，什么都不做
     */
   return function(msg){
      if(process.env.DEBUG == name)
        console.log(msg);
   }
}