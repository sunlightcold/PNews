const mongoose = require('../DBConnect')
const Schema = mongoose.Schema

const itCommentSchema = new mongoose.Schema({
    articleID: {type: Schema.Types.ObjectId, ref: 'itArticle'},  //文章ID
    comment: {type: String},    //评论内容
    userName: {type: String},   //用户名
    pubDate: {type: Date},      //发布时间
    floor: {type: Number}       //楼层
})

const newCommentSchema = new mongoose.Schema({
    articleID: {type: Schema.Types.ObjectId, ref: 'newArticle'},
    comment: {type: String},
    userName: {type: String},
    pubDate: {type: Date},
    floor: {type: Number}
})

const mobileCommentSchema = new mongoose.Schema({
    articleID: {type: Schema.Types.ObjectId, ref: 'mobileArticle'},
    comment: {type: String},
    userName: {type: String},
    pubDate: {type: Date},
    floor: {type: Number}
})

const officeCommentSchema = new mongoose.Schema({
    articleID: {type: Schema.Types.ObjectId, ref: 'officeArticle'},
    comment: {type: String},
    userName: {type: String},
    pubDate: {type: Date},
    floor: {type: Number}
})

const digitalCommentSchema = new mongoose.Schema({
    articleID: {type: Schema.Types.ObjectId, ref: 'digitalArticle'},
    comment: {type: String},
    userName: {type: String},
    pubDate: {type: Date},
    floor: {type: Number}
})

const softwareCommentSchema = new mongoose.Schema({
    articleID: {type: Schema.Types.ObjectId, ref: 'softwareArticle'},
    comment: {type: String},
    userName: {type: String},
    pubDate: {type: Date},
    floor: {type: Number}
})

const scienceCommentSchema = new mongoose.Schema({
    articleID: {type: Schema.Types.ObjectId, ref: 'scienceArticle'},
    comment: {type: String},
    userName: {type: String},
    pubDate: {type: Date},
    floor: {type: Number}
})

const hotCommentSchema = new mongoose.Schema({
    articleID: {type: Schema.Types.ObjectId, ref: 'hotArticle'},
    comment: {type: String},
    userName: {type: String},
    pubDate: {type: Date},
    floor: {type: Number}
})

const hot3CommentSchema = new mongoose.Schema({
    articleID: {type: Schema.Types.ObjectId, ref: 'hot3Article'},
    comment: {type: String},
    userName: {type: String},
    pubDate: {type: Date},
    floor: {type: Number}
})

module.exports = {
    itCommentModel: mongoose.model('itComment', itCommentSchema),
    newsCommentModel: mongoose.model('newsComment', newCommentSchema),
    officeCommentModel: mongoose.model('officeComment', officeCommentSchema),
    mobileCommentModel: mongoose.model('mobileComment', mobileCommentSchema),
    digitalCommentModel: mongoose.model('digitalComment', digitalCommentSchema),
    softwareCommentModel: mongoose.model('softwareComment', softwareCommentSchema),
    scienceCommentModel: mongoose.model('scienceComment', scienceCommentSchema),
    hotCommentModel: mongoose.model('hotComment', hotCommentSchema),
    hot3CommentModel: mongoose.model('hot3Comment', hot3CommentSchema)
}