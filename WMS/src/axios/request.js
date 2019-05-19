const axios = require('axios')
const router = require('../router')

/**
 * axios实例
 */
const service = axios.create({
    // baseURL: 'http://localhost:5000/api',  // api的base_url
    timeout: 5000  // 请求超时时间
})


/**
 * request拦截器
 */
service.interceptors.request.use(config => {

    console.log('数据加载中...')

    const token = localStorage.getItem('token')

    //每次请求headers添加token发送
    if (token) {
        config.headers.common['Authorization'] = token
    }

    return config

}, error => {  //请求错误处理

    return Promise.reject(error)
})


/**
 * response拦截器
 */
service.interceptors.response.use(
    response => {  //成功请求到数据

        // 判断响应中是否有token，替换token
        let token = response.headers.authorization;
        
        if (token) {
            //刷新token
            axios.defaults.headers.common['Authorization'] = token
        }
        
        console.log('加载完成');
        
        return response

    }, error => {
        if (error.response) {

            switch (error.response.status) {
                case 401:
                    // 清除token
                    router.replace({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }//登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error)
    })

export default service
