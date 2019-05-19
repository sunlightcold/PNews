const pconlinelist = require('./GetPConlineListData')
const pconlinearticle = require('./GetPConlineArticleData')

/**
 * 
 * @param {*爬取url} articleListURL 
 */
async function GetPConlineArticleListData(articleListURL) {

    let listUrl = []    //保存列表url
    let datatemp   //数据
    let articleListDate = [] //保存文章列表数据

    //获取列表数据
    console.log('爬取文章列表信息中...')
    datatemp = await pconlinelist.GetPConlineListData(articleListURL)

    //提取listurl
    for (const element of datatemp) {
        //处理错误url
        if (typeof (element.link) !== 'undefined') {
            listUrl.push('https:' + element.link)
        }
    }

    for (const key in listUrl) {
        let temp = await pconlinearticle.GetPConlineArticleData(listUrl[key])
        articleListDate.push(temp[0])
    }
    // console.log(articleListDate)
    return articleListDate




}

module.exports = {
    GetPConlineArticleListData
}