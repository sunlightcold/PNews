// 引入模块
const cheerio = require('cheerio')
const request = require('request')
const iconv = require('iconv-lite')

const nodejieba = require("nodejieba")

/**
 * 
 * @param {*文章url} articleURL 
 */
async function GetPConlineArticleData(articleURL) {

    let articleDate = [] //保存文章信息
    let contentlist = []  //业界信息段落内容
    //设置请求url
    const articleOpt = {
        url: articleURL,
        gzip: true,
        encoding: null, // 设置返回文件为二进制文件
        method: 'GET'
    }

    return new Promise((resolve, reject) => {

        request(articleOpt, (error, response, body) => {
            if (error) {
                reject(error)
            }

            // 抓取页面内容
            console.log('爬取文章' + articleOpt.url + '信息中...')

            body = iconv.decode(body, 'gb2312'); //转码

            let $ = cheerio.load(body)
            // 解析页面
            // 内容在content-box中
            let article = {
                title: $('.content-tit-1').text(),   //标题
                pubtime: $('.pubtime').text(),       //发布时间
                source: $('.source').text(),         //出处
                author: $('.author').text()          //作者
            }

            //获取文章内容和图片资源
            $('.content p').each(function () {
                contentlist.push($('img', this).attr('data-original') || $('a', this).attr('href') || $('section p', this).text() || $(this).text() || 'https://')
            })
            //载入article,过滤不符合的图片url
            var pattern = new RegExp('^[https\s]');   //匹配规则
            let templist = contentlist.filter(content => {
                return !pattern.test(content)
            })
            //处理图片url
            article.contentlist = templist.map(content => {
                if (content.match(/\/\/img0\S*\.(jpg|png|jpeg)/g)) {
                    content = 'https:' + content.match(/\/\/img0\S*\.(jpg|png|jpeg)/g)
                }
                return content
            })
            //分离文本和图片URL
            article.imgUrl = article.contentlist.filter(content => {
                return RegExp('^(https://)').test(content)
            })
            //过滤爬取失败的数据
            if (article.imgUrl.length === 0) {

            } else {
                article.contentText = article.contentlist.filter(content => {
                    return !RegExp('^(https://)').test(content)
                })
                //载入articleDate
                articleDate.push(article)
            }
            // console.log(article)
            return resolve(articleDate)
        })
    })

}

module.exports = {
    GetPConlineArticleData
}


GetPConlineArticleData("https://news.pconline.com.cn/1257/12572537.html").then(res => {

    const articleData = res[0]
    //关键词数
    let topN = 4
    //关键词数组
    let keywords = []
    //文本
    let contentText

    console.log(articleData.title + ': 提取文章关键词中...')

    //连接文本list
    contentText = articleData.contentText.join(' ')

    //提取关键词结果
    result = nodejieba.extract(contentText, topN)

    // console.log(nodejieba.extract(contentText, 40));

    result.forEach(extractData => {
        keywords.push(extractData.word)
        articleData.keywords = keywords
    })

    console.log(articleData)
})
