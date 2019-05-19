import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Detial from './views/Detail.vue'
import List from './views/List.vue'
import Login from './views/Login.vue'
import KeywordsList from './views/KeywordsList.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  //在此处加入以下内容
  scrollBehavior(to, from, saveTop) {
    if (saveTop) {
      return saveTop;
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/article/:articleType/:id',
      name: 'detail',
      component: Detial
    },
    {
      path: '/articlelist/:articleType',
      name: 'list',
      component: List
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/keywordslist/:keyword',
      name: 'keywordslist',
      component: KeywordsList
    }
  ]
})
