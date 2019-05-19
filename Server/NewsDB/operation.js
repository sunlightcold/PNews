const articleModel = require('./Schema/article')
const getData = require('../NewsCrawler/GetData')
const mongoose = require('./DBConnect')
const comment = require('./Schema/comment')

//太平洋电脑网数据
//页数
const page = 21

//首页 https://news.pconline.com.cn/it/
//下一页 https://news.pconline.com.cn/it/index_1.html

//最新资讯URL
let newsURL = []
//业界资讯URL 
let tradeURL = []
//手机通讯URL
let mobileURL = []
//电脑办公URL
let officeURL = []
//新奇数码
let digitalURL = []
//软件游戏
let softwareURL = []
//科学探索
let scienceURL = []

for (let i = 0; i <= page; i++) {
    if (i == 0) {
        //最新资讯URL
        newsURL.push('https://news.pconline.com.cn/')
        //业界资讯URL 
        tradeURL.push('https://news.pconline.com.cn/it/')
        //手机通讯URL
        mobileURL.push('https://news.pconline.com.cn/mobile/')
        //电脑办公URL
        officeURL.push('https://news.pconline.com.cn/office/')
        //新奇数码
        digitalURL.push('https://news.pconline.com.cn/digital/')
        //软件游戏
        softwareURL.push('https://news.pconline.com.cn/software/')
        //科学探索
        scienceURL.push('https://news.pconline.com.cn/science/')
    } else {
        tradeURL.push(`https://news.pconline.com.cn/it/index_${i}.html`)
        newsURL.push(`https://news.pconline.com.cn/index_${i}.html`)
        mobileURL.push(`https://news.pconline.com.cn/mobile/index_${i}.html`)
        officeURL.push(`https://news.pconline.com.cn/office/index_${i}.html`)
        digitalURL.push(`https://news.pconline.com.cn/digital/index_${i}.html`)
        softwareURL.push(`https://news.pconline.com.cn/software/index_${i}.html`)
        scienceURL.push(`https://news.pconline.com.cn/science/index_${i}.html`)
    }
}

let start = 20  //开始
let end = 21    //结束


/**
 * 删除集合
 */
function DeleteCollections() {

    articleModel.itModel.remove((err, res) => {
        if (err) {
            console.log('删除失败')
        } else {
            console.log('删除成功')
        }
    })

    articleModel.newsModel.remove((err, res) => {
        if (err) {
            console.log('删除失败')
        } else {
            console.log('删除成功')
        }
    })

    articleModel.officeModel.remove((err, res) => {
        if (err) {
            console.log('删除失败')
        } else {
            console.log('删除成功')
        }
    })

    articleModel.digitalModel.remove((err, res) => {
        if (err) {
            console.log('删除失败')
        } else {
            console.log('删除成功')
        }
    })

    articleModel.softwareModel.remove((err, res) => {
        if (err) {
            console.log('删除失败')
        } else {
            console.log('删除成功')
        }
    })

    articleModel.scienceModel.remove((err, res) => {
        if (err) {
            console.log('删除失败')
        } else {
            console.log('删除成功')
        }
    })

    articleModel.mobileModel.remove((err, res) => {
        if (err) {
            console.log('删除失败')
        } else {
            console.log('删除成功')
        }
    })
}
// DeleteCollections()

/**
 * 创建Collection
 */
function createCollections() {
    comment.newsCommentModel.createCollection().then(collection => {
        console.log('newsComment is created!')
    })

    comment.itCommentModel.createCollection().then(collection => {
        console.log('itComment is created!')
    })

    comment.mobileCommentModel.createCollection().then(collection => {
        console.log('mobileComment is created!')
    })

    comment.digitalCommentModel.createCollection().then(collection => {
        console.log('digitalComment is created!')
    })

    comment.officeCommentModel.createCollection().then(collection => {
        console.log('officeComment is created!')
    })

    comment.scienceCommentModel.createCollection().then(collection => {
        console.log('scienceComment is created!')
    })

    comment.softwareCommentModel.createCollection().then(collection => {
        console.log('softwareComment is created!')
    })
}

// createCollections()

/**
 * 数据爬取
 */
// getItData: getData(tradeURL, 'it'),               //业界资讯
// getNewsData: getData(newsURL, 'news'),              //最新资讯
// getMobileData: getData(mobileURL, 'mobile'),          //手机通讯
// getDigitalData: getData(digitalURL, 'digital'),        //新奇数码
// getOfficeData: getData(officeURL, 'office'),          //电脑办公
// getScienceData: getData(scienceURL, 'science'),        //科学探索
// getSoftwareData: getData(softwareURL, 'software'),       //软件游戏
// GetHot: GetHot('hot')



/**
 * 数据存储
 */

//业界资讯
async function storeItData() {
    let itData = await getData.getData(tradeURL.slice(start, end), 'it')
    return new Promise((resolve, reject) => {
        articleModel.itModel.insertMany(itData, (err, res) => {
            if (err) {
                reject("itData: 存储失败: ")
            }
            else {
                resolve("itData: 存储成功: ")
                delete itData
            }
        })
    })
}

//最新资讯
async function storeNewsData() {
    let newsData = await getData.getData(newsURL.slice(start, end), 'news')
    return new Promise((resolve, reject) => {
        console.log('存储中...')
        articleModel.newsModel.insertMany(newsData, (err, res) => {
            if (err) {
                reject("newsData: 存储失败: ")
            }
            else {
                resolve("newsData: 存储成功: ")
                delete newsData
            }
        })
    })

}

// 存储手机通讯
async function storeMobileData() {
    let mobileData = await getData.getData(mobileURL.slice(start, end), 'mobile')
    return new Promise((resolve, reject) => {
        console.log('存储中...')
        articleModel.mobileModel.insertMany(mobileData, (err, res) => {
            if (err) {
                reject("mobileData: 存储失败: ");
            }
            else {
                resolve("mobileData: 存储成功: ");
                delete mobileData
            }
        })
    })
}

// 存储新奇数码
async function storeDigitalData() {
    let digitalData = await getData.getData(digitalURL.slice(start, end), 'digital')
    return new Promise((resolve, reject) => {
        console.log('存储中...')
        articleModel.digitalModel.insertMany(digitalData, (err, res) => {
            if (err) {
                reject("mobileData: 存储失败: ");
            }
            else {
                resolve("mobileData: 存储成功: ");
                delete digitalData
            }
        })
    })
}

// 存储电脑办公
async function storeOfficeData() {
    let officeData = await getData.getData(officeURL.slice(start, end), 'office')
    return new Promise((resolve, reject) => {
        console.log('存储中...')
        articleModel.officeModel.insertMany(officeData, (err, res) => {
            if (err) {
                reject("officeData: 存储失败: ");
            }
            else {
                resolve("officeData: 存储成功: ");
                delete officeData
            }
        })
    })
}

// 科学探索
async function storeScienceData() {
    let scienceData = await getData.getData(scienceURL.slice(start, end), 'science')
    // console.log(scienceData)
    return new Promise((resolve, reject) => {
        console.log('存储中...')
        articleModel.scienceModel.insertMany(scienceData, (err, res) => {
            if (err) {
                reject("scienceData: 存储失败: ");
            }
            else {
                resolve("scienceData: 存储成功: ");
                delete scienceData
            }
        })
    })
}

// 软件游戏
async function storeSoftwareData() {
    let softwareData = await getData.getData(softwareURL.slice(start, end), 'software')
    // console.log(scienceData)
    return new Promise((resolve, reject) => {
        console.log('存储中...')
        articleModel.softwareModel.insertMany(softwareData, (err, res) => {
            if (err) {
                reject("softwareData: 存储失败: ");
            }
            else {
                resolve("softwareData: 存储成功: ");

                delete softwareData
            }
        })
    })
}

// 24小时热门文章
async function storeHotData() {
    let hotData = await getData.GetHot('hot')
    // console.log(scienceData)
    return new Promise((resolve, reject) => {
        console.log('存储中...')
        articleModel.hotModel.insertMany(hotData, (err, res) => {
            if (err) {
                reject("HotData: 存储失败: ");
            }
            else {
                resolve("HotData: 存储成功: ");
            }
        })
    })
}

// 3日热门文章
async function storeHot3Data() {
    let hot3Data = await getData.GetHot3('hot3')
    // console.log(scienceData)
    return new Promise((resolve, reject) => {
        console.log('存储中...')
        articleModel.hot3Model.insertMany(hot3Data, (err, res) => {
            if (err) {
                reject("Hot3Data: 存储失败: ");
            }
            else {
                resolve("Hot3Data: 存储成功: ");
            }
        })
    })
}

// async function storeData() {
//     await storeItData()
//     await storeNewsData()
//     await storeMobileData()
//     await storeDigitalData()
//     await storeOfficeData()
//     await storeScienceData()
//     await storeSoftwareData()
//     await storeHotData()
//     await storeHot3Data()
// }

// storeData()


console.log('---------------------------------')
console.log('---------第 ' + end + '轮开始---------')
console.log('---------------------------------')

// if (end == 21) {
//     clearInterval(timer)
// }

storeItData().then(res => {
    console.log('------------------')
    console.log(res)
    console.log('------------------')

    storeNewsData().then(res => {
        console.log('------------------')
        console.log(res)
        console.log('------------------')

        storeMobileData().then(res => {
            console.log('------------------')
            console.log(res)
            console.log('------------------')

            storeDigitalData().then(res => {
                console.log('------------------')
                console.log(res)
                console.log('------------------')

                storeOfficeData().then(res => {
                    console.log('------------------')
                    console.log(res)
                    console.log('------------------')

                    storeScienceData().then(res => {
                        console.log('------------------')
                        console.log(res)
                        console.log('------------------')

                        storeSoftwareData().then(res => {
                            console.log('------------------')
                            console.log(res)
                            console.log('------------------')
                            console.log('--------结束--------')
                            // start++
                            // end++
                        })
                    })
                })
            })
        })
    })
})



// storeHotData().then(res => {
//     console.log('------------------')
//     console.log(res)
//     console.log('------------------')

//     storeHot3Data().then(res => {
//         console.log('------------------')
//         console.log(res)
//         console.log('------------------')
//     })
// })