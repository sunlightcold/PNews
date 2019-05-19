const articleModel = require('./Schema/article')

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

    articleModel.hotModel.remove((err, res) => {
        if (err) {
            console.log('删除失败')
        } else {
            console.log('删除成功')
        }
    })
    articleModel.hot3Model.remove((err, res) => {
        if (err) {
            console.log('删除失败')
        } else {
            console.log('删除成功')
        }
    })
}
DeleteCollections()