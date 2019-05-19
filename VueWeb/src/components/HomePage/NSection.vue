<template>
  <div class="n-section hidden-xs">
    <div class="container">
      <div class="section-row">
        <div class="section-left col-md-3 col-sm-12 col-xs-12">
          <div class="container section-left-top col-md-12 col-sm-6 col-xs-12">
            <router-link
              :to="'/article/' + $store.state.mobileData[0].articleType + '/' + $store.state.mobileData[0]._id"
              tag="a"
              v-if="$store.state.mobileData[0].articleType"
            >
              <img
                :src="$store.state.mobileData[0].imgUrl[0]"
                :alt="$store.state.mobileData[0].title"
              >
              <span class="tip">手机通信</span>
              <span class="title">{{ $store.state.mobileData[0].title }}</span>
              <div class="meta">
                <span class="date hidden-md">{{ $store.state.mobileData[0].pubtime }}</span>
                <ul>
                  <router-link
                    class="keywords clickword"
                    v-for="(word, index) in $store.state.mobileData[0].keywords"
                    :key="index"
                    tag="li"
                    :to="{ path: '/keywordslist/' + word }"
                  >{{ word }}</router-link>
                </ul>
              </div>
            </router-link>
          </div>
          <div class="container section-left-bottom col-md-12 col-sm-6 col-xs-12">
            <router-link
              tag="a"
              :to="'/article/' + $store.state.itData[0].articleType + '/' + $store.state.itData[0]._id"
              v-if="$store.state.itData[0].articleType"
            >
              <img :src="$store.state.itData[0].imgUrl[0]" :alt="$store.state.itData[0].title">
              <span class="tip">业界资讯</span>
              <span class="title">{{ $store.state.itData[0].title }}</span>
              <div class="meta">
                <span class="date hidden-md">{{ $store.state.itData[0].pubtime }}</span>
                <ul>
                  <router-link
                    class="keywords clickword"
                    v-for="(word, index) in $store.state.itData[0].keywords"
                    :key="index"
                    tag="li"
                    :to="{ path: '/keywordslist/' + word }"
                  >{{ word }}</router-link>
                </ul>
              </div>
            </router-link>
          </div>
        </div>
        <div
          class="section-middle col-md-6 col-sm-12 col-xs-12"
          v-if="$store.state.mobileData[0].articleType"
        >
          <!-- swiper -->
          <swiper :options="swiperOption" class="section-middle-swiper">
            <swiper-slide
              v-for="(newsSwiper, index) in $store.state.newsData"
              :key="index"
              class="swiper-list"
            >
              <router-link
                :to="'/article/' + newsSwiper.articleType + '/' + newsSwiper._id"
                tag="a"
                v-if="newsSwiper.articleType"
              >
                <img :src="newsSwiper.imgUrl[0]" :alt="newsSwiper.title">
                <span class="tip">最新资讯</span>
                <a class="newtitle">{{ newsSwiper.title }}</a>
                <div class="meta">
                  <span class="date">{{ newsSwiper.pubtime }}</span>
                  <ul>
                    <router-link
                      class="keywords clickword"
                      v-for="(word, index) in newsSwiper.keywords"
                      :key="index"
                      tag="li"
                      :to="{ path: '/keywordslist/' + word }"
                    >{{ word }}</router-link>
                  </ul>
                </div>
              </router-link>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div
          class="section-right col-md-3 col-sm-12 col-xs-12"
          v-if="$store.state.mobileData[0].articleType"
        >
          <div class="container section-right-top col-md-12 col-sm-6 col-xs-12">
            <router-link
              tag="a"
              :to="'/article/' + $store.state.officeData[0].articleType + '/' + $store.state.officeData[0]._id"
              v-if="$store.state.officeData[0].articleType"
            >
              <img
                :src="$store.state.officeData[0].imgUrl[0]"
                :alt="$store.state.officeData[0].title"
              >
              <span class="tip">电脑办公</span>
              <span class="title">{{ $store.state.officeData[0].title }}</span>
              <div class="meta">
                <span class="date hidden-md">{{ $store.state.officeData[0].pubtime }}</span>
                <ul>
                  <router-link
                    class="keywords clickword"
                    v-for="(word, index) in $store.state.officeData[0].keywords"
                    :key="index"
                    tag="li"
                    :to="{ path: '/keywordslist/' + word }"
                  >{{ word }}</router-link>
                </ul>
              </div>
            </router-link>
          </div>
          <div class="container section-right-bottom col-md-12 col-sm-6 col-xs-12">
            <router-link
              :to="'/article/' + $store.state.softwareData[0].articleType + '/' + $store.state.softwareData[0]._id"
              tag="a"
              v-if="$store.state.softwareData[0].articleType"
            >
              <img
                :src="$store.state.softwareData[0].imgUrl[0]"
                :alt="$store.state.softwareData[0].title"
              >
              <span class="tip">软件游戏</span>
              <span class="title">{{ $store.state.softwareData[0].title }}</span>
              <div class="meta">
                <span class="date hidden-md">{{ $store.state.softwareData[0].pubtime }}</span>
                <ul>
                  <router-link
                    class="keywords clickword"
                    v-for="(word, index) in $store.state.softwareData[0].keywords"
                    :key="index"
                    tag="li"
                    :to="{ path: '/keywordslist/' + word }"
                  >{{ word }}</router-link>
                </ul>
              </div>
            </router-link>
          </div>
        </div>
      </div>
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
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      newsSwiperList: [],
      itData: [],
      mobileData: [],
      digitalData: [],
      officeData: [],
      softwareData: [],
      scienceData: []
    };
  }
};
</script>

<style lang="stylus" scoped>
.section-row {
  height: 350px;
  margin-top: 40px;

  .clickword {
    cursor: pointer;
  }

  .clickword:hover {
    color: #00c8fa;
  }

  .section-left {
    height: 100%;
    padding: 0 5px;

    .section-left-top {
      height: 50%;
      padding: 0px;
      margin-bottom: 1px;

      a {
        img {
          height: 100%;
          width: 100%;
        }

        .title {
          position: absolute;
          z-index: 100000;
          bottom: 20px;
          left: 0;
          font-size: 10px;
          font-weight: 600;
          background-color: #000;
          opacity: 0.8;
          color: #fff;
          width: 100%;
          padding: 5px 10px;
          overflow: hidden; /* 超出部分隐藏 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis; /* 超出部分文字以...显示 */
        }
      }

      .tip {
        position: absolute;
        z-index: 20000;
        top: 0px;
        left: 0px;
        background-color: #ff58c8;
        color: #fff;
        padding: 5px;
        font-weight: 700;
        text-align: center;
        font-size: 10px;
      }

      .meta {
        position: absolute;
        background-color: #000;
        opacity: 0.8;
        z-index: 10000;
        bottom: 0px;
        left: 0px;
        font-size: 10px;
        color: #fff;
        width: 100%;
        height: 30px;
        height: 20px;
        box-sizing: border-box;

        .date {
          float: left;
          padding-left: 10px;
          font-size: 3px;
          color: #999;
        }

        ul {
          list-style: none;
          padding-left: 0px;
          float: right;
          margin: 0 5px 0 0;

          .keywords {
            float: right;
            padding: 0 2px;
            font-weight: 400;
            font-size: 3px;
          }
        }
      }
    }

    .section-left-bottom {
      height: 50%;
      max-height: 100%;
      padding: 0px;

      a {
        img {
          height: 100%;
          width: 100%;
        }

        .title {
          position: absolute;
          z-index: 100000;
          bottom: 20px;
          left: 0;
          font-size: 10px;
          font-weight: 600;
          background-color: #000;
          opacity: 0.8;
          color: #fff;
          width: 100%;
          padding: 5px 10px;
          overflow: hidden; /* 超出部分隐藏 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis; /* 超出部分文字以...显示 */
        }
      }

      .tip {
        position: absolute;
        z-index: 20000;
        top: 0px;
        left: 0px;
        background-color: #ffc61c;
        color: #fff;
        padding: 5px;
        font-weight: 700;
        text-align: center;
        font-size: 10px;
      }

      .meta {
        position: absolute;
        background-color: #000;
        opacity: 0.8;
        z-index: 10000;
        bottom: 0px;
        left: 0px;
        font-size: 10px;
        color: #fff;
        width: 100%;
        height: 30px;
        height: 20px;
        box-sizing: border-box;

        .date {
          float: left;
          padding-left: 10px;
          font-size: 3px;
          color: #999;
        }

        ul {
          list-style: none;
          padding-left: 0px;
          float: right;
          margin: 0 5px 0 0;

          .keywords {
            float: right;
            padding: 0 2px;
            font-weight: 400;
            font-size: 3px;
          }
        }
      }
    }

    @media (max-width: 992px) {
      .section-left-top {
        height: 100%;
      }

      .section-left-bottom {
        height: 100%;
      }
    }

    @media (max-width: 768px) {
      .section-left-top {
        height: 50%;
      }

      .section-left-bottom {
        height: 50%;
      }
    }
  }

  .section-middle {
    height: 100%;
    padding-left: 0px;
    padding-right: 0px;

    .section-middle-swiper {
      height: 100%;
      width: 100%;
      position: relative;

      .swiper-list {
        width: 100%;

        img {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .tip {
          position: absolute;
          z-index: 20000;
          top: 0px;
          left: 0px;
          background-color: #000;
          color: #fff;
          padding: 5px;
          font-weight: 900;
          text-align: center;
        }

        .newtitle {
          position: absolute;
          background-color: #000;
          opacity: 0.8;
          z-index: 10000;
          left: 0px;
          bottom: 30px;
          padding: 10px 20px;
          font-size: 18px;
          font-weight: 900;
          color: #fff;
          width: 100%;
          overflow: hidden; /* 超出部分隐藏 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis; /* 超出部分文字以...显示 */
        }

        .meta {
          position: absolute;
          background-color: #000;
          opacity: 0.8;
          z-index: 10000;
          bottom: 0px;
          font-size: 10px;
          color: #fff;
          width: 100%;
          height: 30px;

          .date {
            float: left;
            padding-left: 20px;
          }

          ul {
            list-style: none;
            padding-left: 0px;
            float: right;
            margin-right: 10px;

            .keywords {
              float: right;
              padding: 0 2px;
              font-weight: 900;
            }
          }
        }
      }
    }
  }

  .section-right {
    height: 100%;
    padding: 0 3px;

    .section-right-top {
      height: 50%;
      padding: 0px;
      margin-bottom: 1px;

      a {
        img {
          height: 100%;
          width: 100%;
        }

        .title {
          position: absolute;
          z-index: 100000;
          bottom: 20px;
          left: 0;
          font-size: 10px;
          font-weight: 600;
          background-color: #000;
          opacity: 0.8;
          color: #fff;
          width: 100%;
          padding: 5px 10px;
          overflow: hidden; /* 超出部分隐藏 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis; /* 超出部分文字以...显示 */
        }
      }

      .tip {
        position: absolute;
        z-index: 20000;
        top: 0px;
        left: 0px;
        background-color: #67bf35;
        color: #fff;
        padding: 5px;
        font-weight: 700;
        text-align: center;
        font-size: 10px;
      }

      .meta {
        position: absolute;
        background-color: #000;
        opacity: 0.8;
        z-index: 10000;
        bottom: 0px;
        left: 0px;
        font-size: 10px;
        color: #fff;
        width: 100%;
        height: 30px;
        height: 20px;
        box-sizing: border-box;

        .date {
          float: left;
          padding-left: 10px;
          font-size: 3px;
          color: #999;
        }

        ul {
          list-style: none;
          padding-left: 0px;
          float: right;
          margin: 0 5px 0 0;

          .keywords {
            float: right;
            padding: 0 2px;
            font-weight: 400;
            font-size: 3px;
          }
        }
      }
    }

    .section-right-bottom {
      height: 50%;
      padding: 0px;

      a {
        img {
          height: 100%;
          width: 100%;
        }

        .title {
          position: absolute;
          z-index: 100000;
          bottom: 20px;
          left: 0;
          font-size: 10px;
          font-weight: 600;
          background-color: #000;
          opacity: 0.8;
          color: #fff;
          width: 100%;
          padding: 5px 10px;
          overflow: hidden; /* 超出部分隐藏 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis; /* 超出部分文字以...显示 */
        }
      }

      .tip {
        position: absolute;
        z-index: 20000;
        top: 0px;
        left: 0px;
        background-color: #516eab;
        color: #fff;
        padding: 5px;
        font-weight: 700;
        text-align: center;
        font-size: 10px;
      }

      .meta {
        position: absolute;
        background-color: #000;
        opacity: 0.8;
        z-index: 10000;
        bottom: 0px;
        left: 0px;
        font-size: 10px;
        color: #fff;
        width: 100%;
        height: 30px;
        height: 20px;
        box-sizing: border-box;

        .date {
          float: left;
          padding-left: 10px;
          font-size: 3px;
          color: #999;
        }

        ul {
          list-style: none;
          padding-left: 0px;
          float: right;
          margin: 0 5px 0 0;

          .keywords {
            float: right;
            padding: 0 2px;
            font-weight: 400;
            font-size: 3px;
          }
        }
      }
    }

    @media (max-width: 992px) {
      .section-right-top {
        height: 100%;
      }

      .section-right-bottom {
        height: 100%;
      }
    }

    @media (max-width: 768px) {
      .section-right-top {
        height: 50%;
      }

      .section-right-bottom {
        height: 50%;
      }
    }
  }

  @media (max-width: 992px) {
    .section-left {
      padding: 0 0 5px 0;

      .section-left-top {
        padding-right: 2.5px;
      }

      .section-left-bottom {
        padding-left: 2.5px;
      }
    }

    .section-middle {
    }

    .section-right {
      padding: 5px 0 0 0;

      .section-right-top {
        padding-right: 2.5px;
      }

      .section-right-bottom {
        padding-left: 2.5px;
      }
    }
  }
}
</style>

