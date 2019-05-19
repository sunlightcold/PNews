import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserInfo from '@/components/UserInfo.vue'
import ArticleList from '@/components/ArticleList.vue'
import EditArticle from '@/components/EditArticle.vue'
import Login from './views/Login.vue'
import EditUser from '@/components/EditUser.vue'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          name: 'userinfo',
          path: "userinfo",
          component: UserInfo,
          meta: {
            auth: true
          },
        },
        {
          name: 'articlelist',
          path: "/home/articlelist/:articletype",
          component: ArticleList,
          meta: {
            auth: true
          }
        },
        {
          name: 'editarticle',
          path: "/home/editarticle/:articleType/:_id",
          component: EditArticle,
          meta: {
            auth: true
          }
        },
        {
          name: 'edituser',
          path: "/home/edituser/:_id",
          component: EditUser,
          meta: {
            auth: true
          }
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) { //权限判断
    if (localStorage.getItem('token')) { //读取token值
    //  成功
      next()

    } else {

      // next({path:'/'})
      alert("未登录")
    }
  } else {
    // 没有meta.auth 不用管
    next()
  }
});

export default router