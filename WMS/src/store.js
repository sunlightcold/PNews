import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageSize: 10,
    currentPage: 1,
    sort: 'desc',
    articleType: 'news',
    username: localStorage.getItem('username') || ''
  },
  mutations: {
    setPageSize(state, pageSize) {
      state.pageSize = pageSize
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
    setSort(state, sort) {
      state.sort = sort
    },
    setArticleType(state, articleType) {
      state.articleType = articleType
    }
  },
  actions: {

  }
})
