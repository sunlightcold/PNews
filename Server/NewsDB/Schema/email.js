const mongoose = require('../DBConnect')

const Schema = mongoose.Schema

const emailSchema = new Schema({                  //定义user Schema
    useremail: { type: String },                  //用户邮箱
    emailcode: { type: Number },                  //验证码
    activation: { type: Boolean }                 //验证码状态
})

module.exports = mongoose.model('Email', emailSchema)   //生成模型

    
    
