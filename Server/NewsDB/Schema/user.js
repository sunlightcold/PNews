const mongoose = require('../DBConnect')

const Schema = mongoose.Schema

const userSchema = new Schema({                  //定义user Schema
    username: { type: String },                  //用户账号
    useremail: {type: String },                  //邮箱
    userpwd: { type: String },                   //密码
    logindate: { type: Date }                    //最近登录时间
})

module.exports = mongoose.model('User', userSchema)   //生成模型