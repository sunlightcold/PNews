<template>
  <div class="home">
    <p-header></p-header>
    <n-section></n-section>
    <popular-section></popular-section>
    <post-section></post-section>
    <it-section></it-section>
    <middle-section></middle-section>
    <p-footer></p-footer>
    <go-top></go-top>
  </div>
</template>

<script>
import PHeader from "@/components/PublicPage/Header.vue";
import NSection from "@/components/HomePage/NSection.vue";
import PopularSection from "@/components/HomePage/PopularSection.vue";
import PostSection from "@/components/HomePage/PostSection.vue";
import ItSection from "@/components/HomePage/ITSection.vue";
import MiddleSection from "@/components/HomePage/MiddleSection.vue";
import PFooter from "@/components/PublicPage/Footer.vue";
import GoTop from "@/components/PublicPage/GoTop.vue";

export default {
  name: "home",
  components: {
    PHeader,
    NSection,
    PopularSection,
    PostSection,
    ItSection,
    MiddleSection,
    PFooter,
    GoTop
  }
};
</script>




