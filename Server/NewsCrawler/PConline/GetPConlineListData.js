// 引入模块
const cheerio = require('cheerio')
const request = require('request')
const iconv = require('iconv-lite')

/**
 * 
 * @param {*列表url} URL 
 */
function GetPConlineListData(URL) {
    // 爬虫的 URL 信息

    //太平洋电脑
    const PConlineOpt = {
        url: URL,
        gzip: true,
        encoding: null, // 设置返回文件为二进制文件
        method: 'GET'
    }

    let ListDate = [] //保存list信息

    return new Promise((resolve, reject) => {

        request(PConlineOpt, (error, response, body) => {
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
            // 内容在list-wrap中
            $('.list-wrap ul li').each(function () {
                // 获取图片链接
                let data = {
                    title: $('dt a', this).text(), // 获取标题
                    content: $('.des', this).text(), //获取内容
                    link: $('dt a', this).attr('href'), // 获取详情页链接
                    picUrl: $('.lpic a img', this).attr('src'), // 获取图片链接
                    time: $('.date', this).text() //获取发表时间
                }
                // 把数据放在一个数组里
                ListDate.push(data)
            })

            return resolve(ListDate)
        })
    })
}

module.exports = {
    GetPConlineListData
}