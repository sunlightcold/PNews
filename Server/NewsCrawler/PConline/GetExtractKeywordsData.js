const nodejieba = require("nodejieba")

/**
 * 
 * @param {*文章信息} articleData 
 */
async function getExtractKeywordsData(articleData) {

    //关键词数
    let topN = 4
    //关键词数组
    let keywords = []
    //文本
    let contentText
    //关键词结果
    let result

    if (typeof articleData !== 'undefined') {

        console.log(articleData.title + ': 提取文章关键词中...')

        //连接文本list
        contentText = articleData.contentText.join(' ')

        //提取关键词结果
        result = nodejieba.extract(contentText, topN)

        result.forEach(extractData => {
            keywords.push(extractData.word)
            articleData.keywords = keywords
        })

        return articleData
    } else {
        return -1
    }
}

module.exports = {
    getExtractKeywordsData
}


