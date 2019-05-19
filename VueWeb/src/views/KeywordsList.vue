<template>
    <div class="key-list">
        <p-header></p-header>
        <keyword-list></keyword-list>
        <go-top></go-top>
    </div>
</template>

<script>
import PHeader from "@/components/PublicPage/Header.vue";
import KeywordList from "@/components/ListPage/KeywordsArticleList.vue";
import GoTop from '@/components/PublicPage/GoTop.vue';

export default {
  components: {
    PHeader,
    KeywordList,
    GoTop
  }
};
</script>
