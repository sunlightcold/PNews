const Router = require('koa-router')
const mongoose = require('../NewsDB/DBConnect')
const articleModel = require('../NewsDB/Schema/article')
const nodemailer = require('nodemailer')
const emailModel = require('../NewsDB/Schema/email')
const userModel = require('../NewsDB/Schema/user')
const commentModel = require('../NewsDB/Schema/comment')
const likeModel = require('../NewsDB/Schema/like')
const koajwt = require('koa-jwt')
const { signToken, verifyToken } = require('./token')

const router = new Router()

router.get('/api/index', async ctx => {

    let newsData = await articleModel.newsModel.find().limit(20)
    let itData = await articleModel.itModel.find().limit(20)
    let mobileData = await articleModel.mobileModel.find().limit(20)
    let officeData = await articleModel.officeModel.find().limit(10)
    let digitalData = await articleModel.digitalModel.find().limit(15)
    let softwareData = await articleModel.softwareModel.find().limit(10)
    let scienceData = await articleModel.scienceModel.find().limit(12)
    ctx.body = {
        newsData,
        itData,
        mobileData,
        officeData,
        digitalData,
        softwareData,
        scienceData
    }
})

//文章详情
router.post('/api/science', async ctx => {
    const id = ctx.request.body._id
    let articleData = await articleModel.scienceModel.findById(id)
    ctx.body = {
        articleData
    }
})

router.post('/api/it', async ctx => {
    const id = ctx.request.body._id
    let articleData = await articleModel.itModel.findById(id)
    ctx.body = {
        articleData
    }
})

router.post('/api/news', async ctx => {

    const articleid = ctx.request.body._id
    const userid = ctx.session.id
    let articleData = await articleModel.newsModel.findById(articleid)
    let likefalg
    //判断用户是否已点赞
    let userlike = await likeModel.findOne({ userid, articleid })
    if (userlike == null) {
        likefalg = false
    } else {
        likefalg = true
    }

    ctx.body = {
        articleData,
        likefalg
    }
})

router.post('/api/office', async ctx => {
    const id = ctx.request.body._id
    let articleData = await articleModel.officeModel.findById(id)
    ctx.body = {
        articleData
    }
})

router.post('/api/software', async ctx => {
    const id = ctx.request.body._id
    let articleData = await articleModel.softwareModel.findById(id)
    ctx.body = {
        articleData
    }
})

router.post('/api/mobile', async ctx => {
    const id = ctx.request.body._id
    let articleData = await articleModel.mobileModel.findById(id)
    ctx.body = {
        articleData
    }
})

router.post('/api/digital', async ctx => {
    const id = ctx.request.body._id
    let articleData = await articleModel.digitalModel.findById(id)
    ctx.body = {
        articleData
    }
})

router.post('/api/hot', async ctx => {
    const id = ctx.request.body._id
    let articleData = await articleModel.hotModel.findById(id)
    ctx.body = {
        articleData
    }
})

router.post('/api/hot3', async ctx => {
    const id = ctx.request.body._id
    let articleData = await articleModel.hot3Model.findById(id)
    ctx.body = {
        articleData
    }
})

//文章列表
router.post('/api/articlelist/it', async ctx => {
    let curPage = ctx.request.body.page
    let pageSize = 20;                        //一页多少条
    let currentPage = curPage;                //当前第几页
    // let sort = { 'logindate': -1 };        //排序（按登录时间倒序）
    let condition = {};                      //条件
    let skipnum = (currentPage - 1) * pageSize;   //跳过数

    let articleList = await articleModel.itModel.find(condition).skip(skipnum).limit(pageSize)

    ctx.body = {
        articleList,
        articleType: '业界资讯'
    }
})

router.post('/api/articlelist/news', async ctx => {
    let curPage = ctx.request.body.page
    let pageSize = 20;                        //一页多少条
    let currentPage = curPage;                //当前第几页
    // let sort = { 'logindate': -1 };        //排序（按登录时间倒序）
    let condition = {};                      //条件
    let skipnum = (currentPage - 1) * pageSize;   //跳过数

    let articleList = await articleModel.newsModel.find(condition).skip(skipnum).limit(pageSize)

    // let articleList = await articleModel.newsModel.find().limit(100)
    ctx.body = {
        articleList,
        articleType: '最新资讯'
    }
})

router.post('/api/articlelist/mobile', async ctx => {
    let curPage = ctx.request.body.page
    let pageSize = 20;                        //一页多少条
    let currentPage = curPage;                //当前第几页
    // let sort = { 'logindate': -1 };        //排序（按登录时间倒序）
    let condition = {};                      //条件
    let skipnum = (currentPage - 1) * pageSize;   //跳过数

    let articleList = await articleModel.mobileModel.find(condition).skip(skipnum).limit(pageSize)
    ctx.body = {
        articleList,
        articleType: '手机通信'
    }
})

router.post('/api/articlelist/digital', async ctx => {
    let curPage = ctx.request.body.page
    let pageSize = 20;                        //一页多少条
    let currentPage = curPage;                //当前第几页
    // let sort = { 'logindate': -1 };        //排序（按登录时间倒序）
    let condition = {};                      //条件
    let skipnum = (currentPage - 1) * pageSize;   //跳过数

    let articleList = await articleModel.digitalModel.find(condition).skip(skipnum).limit(pageSize)
    ctx.body = {
        articleList,
        articleType: '新奇数码'
    }
})

router.post('/api/articlelist/office', async ctx => {
    let curPage = ctx.request.body.page
    let pageSize = 20;                        //一页多少条
    let currentPage = curPage;                //当前第几页
    // let sort = { 'logindate': -1 };        //排序（按登录时间倒序）
    let condition = {};                      //条件
    let skipnum = (currentPage - 1) * pageSize;   //跳过数

    let articleList = await articleModel.officeModel.find(condition).skip(skipnum).limit(pageSize)
    ctx.body = {
        articleList,
        articleType: '电脑办公'
    }
})

router.post('/api/articlelist/science', async ctx => {
    let curPage = ctx.request.body.page
    let pageSize = 20;                        //一页多少条
    let currentPage = curPage;                //当前第几页
    // let sort = { 'logindate': -1 };        //排序（按登录时间倒序）
    let condition = {};                      //条件
    let skipnum = (currentPage - 1) * pageSize;   //跳过数

    let articleList = await articleModel.scienceModel.find(condition).skip(skipnum).limit(pageSize)
    ctx.body = {
        articleList,
        articleType: '科学探索'
    }
})

router.post('/api/articlelist/software', async ctx => {
    let curPage = ctx.request.body.page
    let pageSize = 20;                        //一页多少条
    let currentPage = curPage;                //当前第几页
    // let sort = { 'logindate': -1 };        //排序（按登录时间倒序）
    let condition = {};                      //条件
    let skipnum = (currentPage - 1) * pageSize;   //跳过数

    let articleList = await articleModel.softwareModel.find(condition).skip(skipnum).limit(pageSize)
    ctx.body = {
        articleList,
        articleType: '软件游戏'
    }
})

router.get('/api/articlelist/hot', async ctx => {
    let articleList = await articleModel.hotModel.find().limit(7)
    ctx.body = {
        articleList
    }
})

router.get('/api/articlelist/hot3', async ctx => {
    let articleList = await articleModel.hot3Model.find().limit(7)
    ctx.body = {
        articleList
    }
})


//生成随机数
function getRandom(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start)
}

//发送邮件函数
async function sendEmail(email) {

    //生成4位验证码
    let code = getRandom(1000, 9999)

    let mailTransport = nodemailer.createTransport({
        host: 'smtp.qq.com',
        secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
        auth: {
            user: '840289075@qq.com',
            pass: 'errhdgubsehdbffb'
        },
    });

    let options = {
        from: '"PNews官网" <840289075@qq.com>',
        to: '"用户" <' + email + '>',
        // cc         : ''  //抄送
        // bcc      : ''    //密送
        subject: 'PNews 注册验证码',
        text: 'PNews 注册验证码',
        html: `<h1>验证码：${code}</h1>`,
    };

    return new Promise((resolve, reject) => {
        mailTransport.sendMail(options, async function (err, msg) {
            if (err) {
                console.log(err)
                reject({
                    status: 404,
                })
                // console.log('index', { title: err });
            }
            else {

                //插入邮箱激活信息
                //先检测邮箱信息是否已存在
                let ifemail = await emailModel.findOne({ useremail: email })
                //存在，更新激活状态
                console.log(ifemail)
                if (ifemail !== null) {

                    emailModel.update({ useremail: email }, { activation: true, emailcode: code }, function (err, res) {
                        if (err) {
                            console.log('邮箱激活状态更新失败');
                        } else {
                            console.log('邮箱激活状态更新成功');
                        }
                    })

                } else {
                    //不存在，插入邮箱信息
                    var emailInfo = new emailModel({
                        useremail: email,
                        emailcode: code,
                        activation: true
                    });

                    emailInfo.save(function (err, res) {
                        if (err) {
                            console.log('插入失败');
                        } else {
                            console.log('插入成功');
                        }
                    })
                }

                resolve({
                    status: 502,
                })
            }
        });
    })
}

//发送邮件接口
router.post('/api/getEmailCode', async ctx => {

    let email = ctx.request.body.email
    console.log('email：' + email)
    //验证邮箱是否已注册
    //验证用户是否存在
    let userInfo = await userModel.find({ useremail: email })
    // console.log(userInfo.length)

    if (userInfo.length !== 0) {
        ctx.body = {
            status: 300,
            info: '该邮箱已注册'
        }
    } else {

        let emailCode = await sendEmail(email)

        //60s验证码失效
        setTimeout(() => {
            emailModel.update({ useremail: email }, { activation: false }, function (err, res) {
                if (err) {
                    console.log('邮箱验证码更新失败');
                } else {
                    console.log('邮箱验证码更新成功');
                }
            });
        }, 60000)

        ctx.body = {
            status: emailCode.status
        }
    }

})

//用户注册接口
router.post('/api/register/', async ctx => {
    let username = ctx.request.body.userName
    let useremail = ctx.request.body.email
    let userpwd = ctx.request.body.userpwd
    let emailcode = ctx.request.body.emailCode

    //验证激活码是否有效
    let emailInfo = await emailModel.findOne({ useremail })

    //验证邮箱是否可达
    if (emailInfo == null) {
        ctx.body = {
            status: 304,
            info: '邮箱无效'
        }
    } else {
        //检查激活状态
        if (emailInfo.activation) {

            //检查验证码
            if (emailInfo.emailcode == emailcode) {

                var user = new userModel({
                    username,
                    useremail,
                    userpwd,
                    logindate: new Date()
                })

                await user.save(function (err, res) {
                    if (err) {
                        console.log('用户数据插入失败')
                    } else {
                        console.log('用户数据插入成功')
                    }
                })
                ctx.body = {
                    status: 302,
                    info: '注册成功'
                }

            } else {
                ctx.body = {
                    status: 301,
                    info: '验证码错误'
                }
            }

        } else {
            ctx.body = {
                status: 303,
                info: '验证码失效'
            }
        }
    }



})

//用户登录接口
router.post('/api/login', async ctx => {
    let username = ctx.request.body.username
    let userpwd = ctx.request.body.userpwd

    let userinfo = await userModel.findOne({ username, userpwd })
    // console.log(username + userpwd)
    if (userinfo !== null) {

        ctx.session.user = userinfo.username
        ctx.session.id = userinfo._id
        console.log(ctx.session.user)

        ctx.cookies.set(
            'username',
            encodeURIComponent(userinfo.username), //cookie中默认不支持中文
            {
                maxAge: 1 * 24 * 60 * 60 * 1000, // cookie有效时长
                httpOnly: false,  // 是否只用于http请求中获取
                overwrite: true  // 是否允许重写
            }
        )

        ctx.body = {
            status: 201,
            info: '登录成功'
        }

    } else {
        ctx.body = {
            status: 202,
            info: '用户名或密码错误'
        }
    }
})

//用户评论接口
router.post('/api/article/pinglun', async ctx => {

    let _id = ctx.request.body._id
    let artType = ctx.request.body.articleType
    let artComment = ctx.request.body.articleComment
    let userName = ctx.request.body.userName

    if (artType == 'news') {

        let floor = await commentModel.newsCommentModel.find({ 'articleID': _id })
        let floorlen = floor.length + 1
        // console.log(_id + artType + artComment + userName)
        // console.log(floorlen)
        let pubDate = new Date()
        let comment = new commentModel.newsCommentModel({
            articleID: _id,
            comment: artComment,
            userName: userName,
            pubDate,
            floor: floorlen
        })

        await comment.save((err, res) => {
            if (err) {
                console.log('评论插入失败' + err)
            } else {
                console.log('评论插入成功')
            }
        })

        let cinfo = await commentModel.newsCommentModel.find({ 'pubDate': pubDate })
        console.log(cinfo)

        if (cinfo.length == 0) {
            ctx.body = {
                status: 206,
                info: '评论成功'
            }
        } else {
            ctx.body = {
                status: 205,
                info: '评论失败'
            }
        }

    } else if (artType == 'it') {
        let floor = await commentModel.itCommentModel.find({ 'articleID': _id })
        let floorlen = floor.length + 1
        // console.log(_id + artType + artComment + userName)
        // console.log(floorlen)
        let pubDate = new Date()
        let comment = new commentModel.itCommentModel({
            articleID: _id,
            comment: artComment,
            userName: userName,
            pubDate,
            floor: floorlen
        })

        await comment.save((err, res) => {
            if (err) {
                console.log('评论插入失败' + err)
            } else {
                console.log('评论插入成功')
            }
        })

        let cinfo = await commentModel.itCommentModel.find({ 'pubDate': pubDate })
        console.log('it' + cinfo)

        if (cinfo.length == 0) {
            ctx.body = {
                status: 206,
                info: '评论成功'
            }
        } else {
            ctx.body = {
                status: 205,
                info: '评论失败'
            }
        }
    } else if (artType == 'office') {
        let floor = await commentModel.officeCommentModel.find({ 'articleID': _id })
        let floorlen = floor.length + 1
        // console.log(_id + artType + artComment + userName)
        // console.log(floorlen)
        let pubDate = new Date()
        let comment = new commentModel.officeCommentModel({
            articleID: _id,
            comment: artComment,
            userName: userName,
            pubDate,
            floor: floorlen
        })

        await comment.save((err, res) => {
            if (err) {
                console.log('评论插入失败' + err)
            } else {
                console.log('评论插入成功')
            }
        })

        let cinfo = await commentModel.officeCommentModel.find({ 'pubDate': pubDate })
        console.log(cinfo)

        if (cinfo.length == 0) {
            ctx.body = {
                status: 206,
                info: '评论成功'
            }
        } else {
            ctx.body = {
                status: 205,
                info: '评论失败'
            }
        }
    } else if (artType == 'mobile') {
        let floor = await commentModel.mobileCommentModel.find({ 'articleID': _id })
        let floorlen = floor.length + 1
        // console.log(_id + artType + artComment + userName)
        // console.log(floorlen)
        let pubDate = new Date()
        let comment = new commentModel.mobileCommentModel({
            articleID: _id,
            comment: artComment,
            userName: userName,
            pubDate,
            floor: floorlen
        })

        await comment.save((err, res) => {
            if (err) {
                console.log('评论插入失败' + err)
            } else {
                console.log('评论插入成功')
            }
        })

        let cinfo = await commentModel.mobileCommentModel.find({ 'pubDate': pubDate })
        // console.log(cinfo)

        if (cinfo.length == 0) {
            ctx.body = {
                status: 206,
                info: '评论成功'
            }
        } else {
            ctx.body = {
                status: 205,
                info: '评论失败'
            }
        }
    } else if (artType == 'digital') {
        let floor = await commentModel.digitalCommentModel.find({ 'articleID': _id })
        let floorlen = floor.length + 1
        // console.log(_id + artType + artComment + userName)
        // console.log(floorlen)
        let pubDate = new Date()
        let comment = new commentModel.digitalCommentModel({
            articleID: _id,
            comment: artComment,
            userName: userName,
            pubDate,
            floor: floorlen
        })

        await comment.save((err, res) => {
            if (err) {
                console.log('评论插入失败' + err)
            } else {
                console.log('评论插入成功')
            }
        })

        let cinfo = await commentModel.digitalCommentModel.find({ 'pubDate': pubDate })
        console.log(cinfo)

        if (cinfo.length == 0) {
            ctx.body = {
                status: 206,
                info: '评论成功'
            }
        } else {
            ctx.body = {
                status: 205,
                info: '评论失败'
            }
        }
    } else if (artType == 'science') {
        let floor = await commentModel.scienceCommentModel.find({ 'articleID': _id })
        let floorlen = floor.length + 1
        // console.log(_id + artType + artComment + userName)
        // console.log(floorlen)
        let pubDate = new Date()
        let comment = new commentModel.scienceCommentModel({
            articleID: _id,
            comment: artComment,
            userName: userName,
            pubDate,
            floor: floorlen
        })

        await comment.save((err, res) => {
            if (err) {
                console.log('评论插入失败' + err)
            } else {
                console.log('评论插入成功')
            }
        })

        let cinfo = await commentModel.scienceCommentModel.find({ 'pubDate': pubDate })
        console.log(cinfo)

        if (cinfo.length == 0) {
            ctx.body = {
                status: 206,
                info: '评论成功'
            }
        } else {
            ctx.body = {
                status: 205,
                info: '评论失败'
            }
        }
    } else if (artType == 'software') {
        let floor = await commentModel.softwareCommentModel.find({ 'articleID': _id })
        let floorlen = floor.length + 1
        // console.log(_id + artType + artComment + userName)
        // console.log(floorlen)
        let pubDate = new Date()
        let comment = new commentModel.softwareCommentModel({
            articleID: _id,
            comment: artComment,
            userName: userName,
            pubDate,
            floor: floorlen
        })

        await comment.save((err, res) => {
            if (err) {
                console.log('评论插入失败' + err)
            } else {
                console.log('评论插入成功')
            }
        })

        let cinfo = await commentModel.softwareCommentModel.find({ 'pubDate': pubDate })
        console.log(cinfo)

        if (cinfo.length == 0) {
            ctx.body = {
                status: 206,
                info: '评论成功'
            }
        } else {
            ctx.body = {
                status: 205,
                info: '评论失败'
            }
        }
    } else if (artType == 'hot') {
        let floor = await commentModel.hotCommentModel.find({ 'articleID': _id })
        let floorlen = floor.length + 1
        let pubDate = new Date()
        // console.log(_id + artType + artComment + userName)
        // console.log(floorlen)
        let comment = new commentModel.hotCommentModel({
            articleID: _id,
            comment: artComment,
            userName: userName,
            pubDate,
            floor: floorlen
        })

        await comment.save((err, res) => {
            if (err) {
                console.log('评论插入失败' + err)
            } else {
                console.log('评论插入成功')
            }
        })

        let cinfo = await commentModel.hotCommentModel.find({ 'pubDate': pubDate })
        console.log(cinfo)

        if (cinfo.length == 0) {
            ctx.body = {
                status: 206,
                info: '评论成功'
            }
        } else {
            ctx.body = {
                status: 205,
                info: '评论失败'
            }
        }
    } else if (artType == 'hot3') {
        let floor = await commentModel.hot3CommentModel.find({ 'articleID': _id })
        let floorlen = floor.length + 1
        // console.log(_id + artType + artComment + userName)
        // console.log(floorlen)
        let comment = new commentModel.hot3CommentModel({
            articleID: _id,
            comment: artComment,
            userName: userName,
            pubDate,
            floor: floorlen
        })

        await comment.save((err, res) => {
            if (err) {
                console.log('评论插入失败' + err)
            } else {
                console.log('评论插入成功')
            }
        })

        let cinfo = await commentModel.hot3CommentModel.find({ 'pubDate': pubDate })
        console.log(cinfo)

        if (cinfo.length == 0) {
            ctx.body = {
                status: 206,
                info: '评论成功'
            }
        } else {
            ctx.body = {
                status: 205,
                info: '评论失败'
            }
        }
    }
})

//获取评论数据接口
router.post('/api/commentlist', async ctx => {
    let articleID = ctx.request.body._id
    let artType = ctx.request.body.articleType
    // console.log(articleID + '  ' + artType)

    if (artType == 'news') {
        let commentList = await commentModel.newsCommentModel.find({ articleID })
        ctx.body = {
            commentList
        }
    } else if (artType == 'it') {
        let commentList = await commentModel.itCommentModel.find({ articleID })
        ctx.body = {
            commentList
        }
    } else if (artType == 'mobile') {
        let commentList = await commentModel.mobileCommentModel.find({ articleID })
        ctx.body = {
            commentList
        }
    } else if (artType == 'digital') {
        let commentList = await commentModel.digitalCommentModel.find({ articleID })
        ctx.body = {
            commentList
        }
    } else if (artType == 'software') {
        let commentList = await commentModel.softwareCommentModel.find({ articleID })
        ctx.body = {
            commentList
        }
    } else if (artType == 'science') {
        let commentList = await commentModel.scienceCommentModel.find({ articleID })
        ctx.body = {
            commentList
        }
    } else if (artType == 'office') {
        let commentList = await commentModel.officeCommentModel.find({ articleID })
        ctx.body = {
            commentList
        }
    } else if (artType == 'hot') {
        let commentList = await commentModel.hotCommentModel.find({ articleID })
        ctx.body = {
            commentList
        }
    } else if (artType == 'hot3') {
        let commentList = await commentModel.hot3CommentModel.find({ articleID })
        ctx.body = {
            commentList
        }
    } else {
        ctx.body = {
            status: 207,
            info: '评论获取失败'
        }
    }
})

//关键词搜索查询
router.post('/api/keyslist', async ctx => {
    let keyword = ctx.request.body.keyword

    let querykey = new RegExp(keyword, 'i'); //不区分大小写

    let itList = await articleModel.itModel.find({
        $or: [{ "keywords": querykey }]

    }, (err, res) => {
        if (err) {
            console.log("keywords查询失败")
        } else {
            console.log("keywords查询成功")
        }
    })

    let mobileList = await articleModel.mobileModel.find({
        $or: [{ "keywords": querykey }]

    }, (err, res) => {
        if (err) {
            console.log("keywords查询失败")
        } else {
            console.log("keywords查询成功")
        }
    })

    let digitalList = await articleModel.digitalModel.find({
        $or: [{ "keywords": querykey }]

    }, (err, res) => {
        if (err) {
            console.log("keywords查询失败")
        } else {
            console.log("keywords查询成功")
        }
    })

    let officeList = await articleModel.officeModel.find({
        $or: [{ "keywords": querykey }]

    }, (err, res) => {
        if (err) {
            console.log("keywords查询失败")
        } else {
            console.log("keywords查询成功")
        }
    })

    let softwareList = await articleModel.softwareModel.find({
        $or: [{ "keywords": querykey }]

    }, (err, res) => {
        if (err) {
            console.log("keywords查询失败")
        } else {
            console.log("keywords查询成功")
        }
    })

    let scienceList = await articleModel.scienceModel.find({
        $or: [{ "keywords": querykey }]

    }, (err, res) => {
        if (err) {
            console.log("keywords查询失败")
        } else {
            console.log("keywords查询成功")
        }
    })

    //连接数据

    let articleList = []

    if (itList.length != 0) {
        for (const key in itList) {
            if (itList.hasOwnProperty(key)) {
                const element = itList[key];
                articleList.push(element)

            }
        }
    }
    if (mobileList.length != 0) {
        for (const key in mobileList) {
            if (mobileList.hasOwnProperty(key)) {
                const element = mobileList[key];
                articleList.push(element)

            }
        }
    }
    if (digitalList.length != 0) {
        for (const key in digitalList) {
            if (digitalList.hasOwnProperty(key)) {
                const element = digitalList[key];
                articleList.push(element)

            }
        }
    }
    if (softwareList.length != 0) {
        for (const key in softwareList) {
            if (softwareList.hasOwnProperty(key)) {
                const element = softwareList[key];
                articleList.push(element)

            }
        }
    }
    if (officeList.length != 0) {
        for (const key in officeList) {
            if (officeList.hasOwnProperty(key)) {
                const element = officeList[key];
                articleList.push(element)

            }
        }
    }
    if (scienceList.length != 0) {
        for (const key in scienceList) {
            if (scienceList.hasOwnProperty(key)) {
                const element = scienceList[key];
                articleList.push(element)

            }
        }
    }
    ctx.body = {
        articleList
    }
})

//点赞接口
router.post('/api/like', async ctx => {

    let articleid = ctx.request.body.articleid
    let username = ctx.request.body.username
    let userid = ctx.session.id
    let articletype = ctx.request.body.articletype

    let userdata = await userModel.findOne({ '_id': userid, 'username': username })

    //判断用户是否登录
    if (userdata !== null) {

        //判断用户是否已点赞
        let userlike = await likeModel.findOne({ userid, articleid })

        //未点赞
        if (userlike == null) {
            let likedata = new likeModel({
                userid,
                username,
                articleid,
                likedate: new Date()
            })

            likedata.save(async (err, res) => {
                if (err) {
                    console.log('like失败')
                } else {
                    console.log('like成功')

                }
            })

            //查找并更新文章点赞数
            let artModel = await FindModel(articletype)
            let { like } = await FindData(artModel, { '_id': articleid })
            // console.log('--------' + like)
            await UpdateDB(artModel, { '_id': articleid }, { 'like': ++like })
            ctx.body = {
                status: 208,
                info: '点赞成功',
                like,
                likefalg: true
            }
            //已点赞
        } else {

            await DeleteData(likeModel, { userid, articleid })
            //查找并更新文章点赞数
            let artModel = await FindModel(articletype)
            let { like } = await FindData(artModel, { '_id': articleid })
            await UpdateDB(artModel, { '_id': articleid }, { 'like': --like })

            ctx.body = {
                status: 209,
                info: '取消点赞',
                like,
                likefalg: false
            }
        }


    } else {
        ctx.body = {
            status: 207,
            info: '未登录'
        }
    }
})

//获取用户信息接口
router.get('/api/userinfo', async ctx => {
    let data = await userModel.find()
    ctx.body = {
        info: '用户信息数据',
        data
    }
})

//后台管理
//获取文章列表
router.post('/api/articlelist', async ctx => {
    let params = ctx.request.body.query

    let articleType = params.articleType
    let pageSize = params.pageSize;                        //一页多少条
    let currentPage = params.currentPage;                //当前第几页
    // let sort = { 'logindate': -1 };        //排序（按登录时间倒序）
    let condition = {};                      //条件
    let filter = { title: true, pubtime: true, author: true, source: true, articleType: true }
    let skipnum = (currentPage - 1) * pageSize;   //跳过数

    let model = await FindModel(articleType)
    let totalPage = await model.count()
    let articleList = await model.find(condition, filter).skip(skipnum).limit(pageSize)

    ctx.body = {
        articleList,
        totalPage,
        // articleType,
        info: 'success'
    }
})

//删除文章接口
router.post('/api/delectarticle', async ctx => {
    let articleType = ctx.request.body.articleType
    let _id = ctx.request.body._id

    let model = await FindModel(articleType)
    let res = await DeleteData(model, { _id })
    ctx.body = res
})

router.post('/api/findArticle', async ctx => {
    let articleType = ctx.request.body.articleType
    let _id = ctx.request.body._id

    let model = await FindModel(articleType)
    let article = await FindData(model, { _id })
    ctx.body = {
        article
    }
})

//后台登录接口
router.post('/api/userLogin', async ctx => {
    const { userinfo } = ctx.request.body
    // const token1 = ctx.header.authorization
    let user = await userModel.findOne({
        $and: [
            { username: userinfo.username },
            { userpwd: userinfo.password }
        ]
    })
    try {
        let token = signToken({
            id: user._id,
            username: user.username
        })
        let data = await verifyToken(token)
        ctx.body = {
            status: 402,
            token,
            username: user.username,
            msg: '登录成功'
        }
    } catch (error) {
        ctx.body = {
            status: 409,
            msg: '账号不存在'
        }
    }

})

//更新文章数据
router.post('/api/updateArticle', async ctx => {
    const { article } = ctx.request.body

    if (article.articleType && article._id) {
        let model = await FindModel(article.articleType)
        await UpdateDB(model, { _id: article._id }, {
            author: article.author,
            contentlist: article.contentlist,
            keywords: article.keywords,
            pubtime: article.pubtime,
            source: article.source,
            title: article.title
        })
        ctx.body = {
            msg: '更新成功'
        }
    } else {
        ctx.body = {
            status: 404,
            msg: '更新失败'
        }
    }

})

//查找用户
router.post('/api/findUser', async ctx => {
    let { body } = ctx.request
    let userinfo = await FindData(userModel, { _id: body._id })
    ctx.body = {
        userinfo
    }
})

//更新用户信息
router.post('/api/updateUser', async ctx => {
    const { userinfo } = ctx.request.body

    if (userinfo._id) {
        await UpdateDB(userModel, { _id: userinfo._id }, {
            logindate: userinfo.logindate,
            useremail: userinfo.useremail,
            username: userinfo.username,
            userpwd: userinfo.userpwd
        })
        ctx.body = {
            msg: '更新成功'
        }
    } else {
        ctx.body = {
            status: 404,
            msg: '更新失败'
        }
    }

})
/**
 * 更新数据
 * @param {模型} model 
 * @param {更新条件} condition 
 * @param {更新数据} update 
 */
async function UpdateDB(model, condition, update) {
    await model.update(condition, update, (err, res) => {
        if (err) {
            console.log('更新失败')
        }
        console.log('更新成功')

    })
}

/**
 * 查找数据
 * @param {模型} model 
 * @param {查找条件} condition 
 */
async function FindData(model, condition) {
    return await model.findOne(condition, (err, res) => {
        if (err) {
            console.log('查找失败')
        }
        console.log('查找成功')

    })
}

/**
 * 删除数据
 * @param {模型} model 
 * @param {删除条件} condition 
 */
async function DeleteData(model, condition) {

    return new Promise((resolve, reject) => {
        model.remove(condition, function (err, res) {
            if (err) {
                reject({
                    status: 401,
                    info: '删除失败'
                });
            }
            else {
                resolve({
                    status: 402,
                    info: '删除成功'
                });
            }
        })
    })

}

/**
 * 选择文章数据模型
 * @param {articleType} str 
 */
async function FindModel(str) {
    let model
    if (str == 'news') {
        model = articleModel.newsModel
    } else if (str == 'it') {
        model = articleModel.itModel
    } else if (str == 'mobile') {
        model = articleModel.mobileModel
    } else if (str == 'office') {
        model = articleModel.officeModel
    } else if (str == 'digital') {
        model = articleModel.digitalModel
    } else if (str == 'software') {
        model = articleModel.softwareModel
    } else if (str == 'science') {
        model = articleModel.scienceModel
    } else if (str == 'hot') {
        model = articleModel.hotModel
    } else if (str == 'hot3') {
        model = articleModel.hot3Model
    }
    return model
}

module.exports = router