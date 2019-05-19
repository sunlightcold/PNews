import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    //定义初始数据
    state: {
        newsData: [],
        itData: [],
        mobileData: [],
        digitalData: [],
        officeData: [],
        scienceData: [],
        softwareData: [],
        hotData: [],
        hot3Data: [],
        userNameState: '登录'
        // userNameState: '测试用户1'
    },
    //同步的方法
    mutations: {
        //向state 里面设置数据
        changeListMutation(state, data) {
            state.newsData = data.newsData
            state.itData = data.itData
            state.mobileData = data.mobileData
            state.digitalData = data.digitalData
            state.officeData = data.officeData
            state.scienceData = data.scienceData
            state.softwareData = data.softwareData
            state.hotData = data.hotData
            state.hot3Data = data.hot3Data
        },
        updateUserName(state, str) {
            state.userNameState = str
        }
    },
    //异步的方法
    actions: {
        //Home.vue里面created生命周期里面触发
        getDataAction({ commit }) {
            axios.get('/api/index')
                .then((res) => {
                    commit('changeListMutation', res.data) //调用mutations下面的changeListMutation方法并且传值过去
                })
                .catch((error) => {
                    console.log(error)
                })

        }
    }
})
// 触发异步里面的方法是用 this.$store.dispatch('这里是方法名')
// 触发同步里面的方法是用 this.$store.commit('这里是方法名')