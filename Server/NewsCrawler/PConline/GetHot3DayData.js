//引入模块
const cheerio = require('cheerio')
const pconlineData = require('./GetExtractKeywordsData')
const request = require('request')
const iconv = require('iconv-lite')
const ArticleData = require('./GetPConlineArticleData')

async function GetHot3NewsData() {

    // 爬虫的 URL 信息
    const PConlineOpt = {
        url: 'https://news.pconline.com.cn/',
        gzip: true,
        encoding: null, // 设置返回文件为二进制文件
        method: 'GET'
    }

    let link = []

    let hot3ArticleData = []    //3日热门文章

    return new Promise((resolve, reject) => {

        request(PConlineOpt, async (error, response, body) => {
            if (error) {
                reject(error)
            }

            // 抓取页面内容
            console.log('爬取页面url中...')

            body = iconv.decode(body, 'gb2312'); //转码
            // console.log(html)
            // 使用 cheerio 加载抓取到的 HTML 代码
            // 然后就可以使用 jQuery 的方法了
            // 比如获取某个 class：$('.className')
            // 这样就能获取所有这个 class 包含的内容
            let $ = cheerio.load(body)
            // 解析页面
            // 内容在news-list中
            $('.hot-article .bd ol li').each(function () {

                link.push('https:' + $('a', this).attr('href'))     // 获取详情页链

            })

            for (const key in link) {
                if (link.hasOwnProperty(key)) {
                    const element = link[key];

                    let data = await ArticleData.GetPConlineArticleData(element)
                    hot3ArticleData.push(data)

                }
            }
            return resolve(hot3ArticleData)
        })
    })
}


module.exports = {
    GetHot3NewsData
}

