module.exports = {
    publicPath: './',       //根路径
    // outputDir: 'output',   //构建输出目录
    // assetsDir: 'assets',   //静态资源目录
    lintOnSave: false,      //是否开启eslint

    devServer: {

        open: true,          //是否自动开启浏览器
        host: 'localhost',   //本机名
        port: 8080,          //默认端口号
        https: false,        //是否开启https
        hotOnly: false,      //热更新

        proxy: {//配置跨域
            '/api': {
                target: 'http://localhost:5000/api',
                // target: 'http://120.79.223.170:5000/api',
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''//请求使用api代替target
                }
            },
            '/weather': {
                target: 'http://v.juhe.cn/',
                // target: 'http://120.79.223.170:5000/api',
                // ws: true,
                changOrigin: true,//允许跨域
            }

        }
    }

}