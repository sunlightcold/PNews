<template>
  <div class="detail">
    <p-header></p-header>
    <p-article></p-article>
    <go-top></go-top>
  </div>
</template>

<script>
import PHeader from "@/components/PublicPage/Header.vue";
import PArticle from "@/components/DetailPage/Article.vue";
import PFooter from "@/components/PublicPage/Footer.vue";
import GoTop from '@/components/PublicPage/GoTop.vue';

export default {
  name: "Detail",
  components: {
    PHeader,
    PArticle,
    PFooter,
    GoTop
  }
};
</script>

