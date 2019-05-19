const mongoose = require('../DBConnect')

/**
 * 定义article schema
 */
const articleSchema = new mongoose.Schema({
    title: {type: String},                   //标题
    pubtime: {type: String},                 //发表时间
    source: {type: String},                  //文章来源
    author: {type: String},                  //作者
    contentlist: {type: Array},              //文本图片列表
    imgUrl: {type: Array},                   //图片列表
    contentText: {type: Array},              //文本内容列表
    keywords: {type: Array},                 //关键词
    like: {type: Number, default: 0},        //点赞数
    articleType: {type: String},             //文章类型
    numComment: {type: Number, default: 0}   //评论数
})

/**
 * 导出模型
 */
module.exports = {
    itModel: mongoose.model('itArticle', articleSchema),              //业界资讯 
    newsModel: mongoose.model('newArticle', articleSchema),           //最新资讯
    mobileModel: mongoose.model('mobileArticle', articleSchema),      //手机通讯
    officeModel: mongoose.model('officeArticle', articleSchema),           //电脑办公
    digitalModel: mongoose.model('digitalArticle', articleSchema),         //新奇数码
    softwareModel: mongoose.model('softwareArticle', articleSchema),       //软件游戏
    scienceModel: mongoose.model('scienceArticle', articleSchema),         //科学探索
    hotModel: mongoose.model('hotArticle', articleSchema),                 //24小时热门文章
    hot3Model: mongoose.model('hot3Article', articleSchema)                //3日热门文章
}