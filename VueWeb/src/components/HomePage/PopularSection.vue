<template>
  <div class="popular-section hidden-sm hidden-xs">
    <div class="container">
      <!-- swiper -->
      <div class="tip">科学探索</div>
      <swiper :options="swiperOption" class="science-swiper">
        <swiper-slide
          v-for="(scienceData, index) in $store.state.scienceData"
          :key="index"
          class="swiper-list"
        >
          <router-link
            :to="'/article/' + scienceData.articleType + '/' + scienceData._id"
            class="sciencehref"
            v-if="scienceData.articleType"
          >
            <img :src="scienceData.imgUrl[0]" :alt="scienceData.title">
            <a class="title">{{ scienceData.title }}</a>
            <div class="meta">
              <span class="date">{{ scienceData.pubtime }}</span>
              <ul>
                <router-link
                  class="keywords clickword"
                  v-for="(word, index) in scienceData.keywords"
                  :key="index"
                  tag="li"
                  :to="{ path: '/keywordslist/' + word }"
                >{{ word }}</router-link>
              </ul>
            </div>
          </router-link>

          <div class="swiper-pagination" slot="pagination"></div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        speed: 1000,
        loop: true,
        slidesPerView: 3,
        spaceBetween: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
.popular-section {
  margin-top: 20px;
  padding: 50px 0;
  background-color: #effcff;

  .clickword {
    cursor: pointer;
  }

  .clickword:hover {
    color: #00c8fa;
  }

  .container {
    height: 180px;
    position: relative;

    .tip {
      position: absolute;
      z-index: 20000;
      top: -30px;
      left: 15px;
      height: 30px;
      background-color: #67bf35;
      color: #fff;
      padding: 5px;
      font-weight: 700;
      text-align: center;
      font-size: 10px;
    }

    .science-swiper {
      height: 100%;

      .sciencehref {
        height: 100%;
        width: 100%;
        display: block;
        background-color: #212529;

        img {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          height: 90%;
          width: 35%;
          border-radius: 15px;
          padding: 10px;
        }

        .title {
          position: absolute;
          top: 25px;
          right: 8px;
          width: 60%;
          color: #fff;
          font-weight: 500;
          font-size: 15px;
          overflow: hidden; /* 超出部分隐藏 */
          text-overflow: ellipsis; /* 超出部分文字以...显示 */
        }

        .meta {
          position: absolute;
          bottom: 0px;
          right: 8px;
          width: 60%;

          .date {
            position: absolute;
            bottom: 20px;
            right: 8px;
            color: #aaa;
            font-size: 12px;
          }

          ul {
            width: 100%;
            list-style: none;
            color: #fff;
            font-size: 13px;
            position: absolute;
            bottom: 35px;
            right: 8px;
            padding-left: 40px;

            .keywords {
              float: right;
              padding: 2px;
            }
          }
        }
      }
    }
  }
}
</style>

