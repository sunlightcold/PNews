const mongoose = require('../DBConnect')

const Schema = mongoose.Schema

const likeSchema = new Schema({   
    userid: {type: Schema.Types.ObjectId, ref: 'User'},         //点赞用户id      
    username: {type: String},                                 //点赞用户名
    articleid: {type: String},                                  //点赞文章id
    likedate: {type: Date}                                      //点赞时间
})

module.exports = mongoose.model('Like', likeSchema)   //生成模型