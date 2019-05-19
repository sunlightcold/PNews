const mongoose = require('mongoose')

//远程mongodb数据库
DB_URL = 'mongodb://120.79.223.170:27017';
//连接配置
const Opt = {
  user: 'root',
  pass: '123456',
  dbName: 'PNewsDB',
  useNewUrlParser: true
}

/**
 * 连接
 */
mongoose.connect(DB_URL, Opt);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});   

module.exports = mongoose