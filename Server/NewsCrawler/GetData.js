//引入模块
const pconlineData = require('./PConline/GetExtractKeywordsData')
const pconlineArticleList = require('./PConline/GetPConlineArticleListData')
const pconlineHot = require('./PConline/GetHotNewsData')
const pconlineHot3 = require('./PConline/GetHot3DayData')


/**
 * 爬取数据，提取关键词
 */
async function getData(URL, ArticleType) {

    //存储数据
    let data = []
    //最终数据
    let extArt = []

    //所有文章信息存储
    for (const key in URL) {

        if (URL.hasOwnProperty(key)) {

            const element = URL[key];

            let pconlineArticleListData = await pconlineArticleList.GetPConlineArticleListData(element)

            for (const key in pconlineArticleListData) {
                if (pconlineArticleListData.hasOwnProperty(key)) {
                    const element = pconlineArticleListData[key];

                    data.push(element)
                }
            }

        }
    }

    //提取文章关键词
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            let temp = await pconlineData.getExtractKeywordsData(element)
            if (temp !== -1) {
                temp.articleType = ArticleType
                extArt.push(temp)
            }
        }
    }

    return extArt
}

async function GetHot(ArticleType) {
    //存储数据
    let data = []
    //最终数据
    let extArt = []

    //所有文章信息存储
    data = await pconlineHot.GetHotNewsData()

    //提取文章关键词
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            // console.log(element)
            let temp = await pconlineData.getExtractKeywordsData(element[0])
            if (temp !== -1) {
                temp.articleType = ArticleType
                extArt.push(temp)
            }
        }
    }
    return extArt
}

async function GetHot3(ArticleType) {
    //存储数据
    let data = []
    //最终数据
    let extArt = []

    //所有文章信息存储
    data = await pconlineHot3.GetHot3NewsData()

    //提取文章关键词
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            // console.log(element)
            let temp = await pconlineData.getExtractKeywordsData(element[0])
            if (temp !== -1) {
                temp.articleType = ArticleType
                extArt.push(temp)
            }
        }
    }
    return extArt
}

GetHot3('hot3')

module.exports = {
    getData,
    GetHot,                   //24小时热门文章                       
    GetHot3                   //3日热门文章
}