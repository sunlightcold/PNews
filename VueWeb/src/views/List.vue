<template>
  <div class="list">
    <p-header></p-header>
    <article-list></article-list>
    <go-top></go-top>
  </div>
</template>

<script>
import PHeader from "@/components/PublicPage/Header.vue";
import ArticleList from "@/components/ListPage/ArticleList.vue";
import GoTop from "@/components/PublicPage/GoTop.vue";

export default {
  name: "list",
  components: {
    PHeader,
    ArticleList,
    GoTop
  },
  
  methods: {

  }
};
</script>

