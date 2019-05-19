<template>
  <div class="post-section">
    <div class="container">
      <div class="software-news col-md-4 col-sm-12">
        <div class="software-news-header">
          <span class="software">软件游戏</span>
          <router-link tag="a" class="more" :to="{ path: '/articlelist/software' }">More</router-link>
          <!-- <span class="more">More</span> -->
        </div>
        <!-- swiper -->
        <swiper :options="swiperOption" class="software-swiper">
          <swiper-slide
            class="software-slide"
            v-for="(softwarelist, index) in $store.state.softwareData"
            :key="index"
          >
            <router-link
              :to="'/article/' + softwarelist.articleType + '/' + softwarelist._id"
              tag="a"
            >
              <div class="softwareList">
                <img :src="softwarelist.imgUrl[0]" :alt="softwarelist.title">
                <div class="content">
                  <div class="title">{{ softwarelist.title }}</div>
                  <div class="meta">
                    <span class="date">{{ softwarelist.pubtime }}</span>
                    <ul>
                      <router-link
                        class="keywords clickword"
                        v-for="(word, index) in softwarelist.keywords"
                        :key="index"
                        tag="li"
                        :to="{ path: '/keywordslist/' + word }"
                      >{{ word }}</router-link>
                    </ul>
                  </div>
                </div>
              </div>
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="mobile col-md-8 col-sm-12">
        <div class="mobile-header">
          <span class="mobile-title">手机通信</span>
          <router-link tag="a" class="more" :to="{ path: '/articlelist/mobile' }">More</router-link>
          <!-- <span class="more">More</span> -->
        </div>
        <div class="mobile-right col-md-6 col-sm-6 hidden-xs">
          <div
            class="mobilelist"
            v-for="(mobilelist, index) in $store.state.mobileData.slice(10, 15)"
            :key="index"
          >
            <router-link :to="'/article/' + mobilelist.articleType + '/' + mobilelist._id" tag="a">
              <img :src="mobilelist.imgUrl[0]" :alt="mobilelist.title">
              <div class="content">
                <div class="title">{{ mobilelist.title }}</div>
                <div class="meta">
                  <span class="date">{{ mobilelist.pubtime }}</span>
                  <ul>
                    <router-link
                      class="keywords clickword"
                      v-for="(word, index) in mobilelist.keywords"
                      :key="index"
                      tag="li"
                      :to="{ path: '/keywordslist/' + word }"
                    >{{ word }}</router-link>
                  </ul>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="mobile-left col-md-6 col-sm-6 col-xs-12">
          <div class="mobilelist">
            <router-link
              :to="'/article/' + $store.state.mobileData[0].articleType + '/' + $store.state.mobileData[0]._id"
              tag="a"
            >
              <img
                :src="$store.state.mobileData[0].imgUrl[0]"
                :alt="$store.state.mobileData[0].title"
              >
              <div class="content">
                <div class="title">{{ $store.state.mobileData[0].title }}</div>
                <div class="meta">
                  <span class="date">{{ $store.state.mobileData[0].pubtime }}</span>
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
                <div class="text">{{ $store.state.mobileData[0].contentText[0] }}</div>
              </div>
            </router-link>
          </div>
          <div class="mobilelist">
            <router-link
              :to="'/article/' + $store.state.mobileData[1].articleType + '/' + $store.state.mobileData[1]._id"
              tag="a"
            >
              <img
                :src="$store.state.mobileData[1].imgUrl[0]"
                :alt="$store.state.mobileData[1].title"
              >
              <div class="content">
                <div class="title">{{ $store.state.mobileData[1].title }}</div>
                <div class="meta">
                  <span class="date">{{ $store.state.mobileData[1].pubtime }}</span>
                  <ul>
                    <router-link
                      class="keywords clickword"
                      v-for="(word, index) in $store.state.mobileData[1].keywords"
                      :key="index"
                      tag="li"
                      :to="{ path: '/keywordslist/' + word }"
                    >{{ word }}</router-link>
                  </ul>
                </div>
                <div class="text">{{ $store.state.mobileData[1].contentText[0] }}</div>
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
        slidesPerView: 1,
        slidesPerColumn: 5,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
          clickable: true,
          hideOnClick: true,
          hiddenClass: "my-button-hidden"
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        speed: 1000
      },
      softwareData: [],
      mobileData: [],
      mobileListData: []
    };
  }
};
</script>

<style lang="stylus" scoped>
.post-section {
  margin-top: 50px;

  .container {
    .clickword {
      cursor: pointer;
    }

    .clickword:hover {
      color: #00c8fa;
    }

    .mobile {
      height: 900px;
      padding: 0px;

      .mobile-header {
        height: 5%;

        .mobile-title {
          height: 100%;
          line-height: 45px;
          display: inline-block;
          font-size: 17px;
          font-weight: bold;
          background-color: #fff;
          border-left: 5px solid #f40;
          float: left;
          padding: 0 20px;
          color: #00c8fa;
        }

        .more {
          height: 100%;
          line-height: 45px;
          display: inline-block;
          font-size: 18px;
          font-weight: bold;
          background-color: #fff;
          padding: 0 20px;
          float: right;
          color: #00c8fa;
        }
      }

      .mobile-left {
        height: 95%;
        padding: 0px;

        .mobilelist {
          height: 50%;
          padding: 10px;
          border: 1px solid #eee;

          a {
            text-decoration: none;
          }

          img {
            height: 50%;
            width: 100%;
          }

          .content {
            height: 50%;
            width: 100%;
            background-color: rgb(255, 255, 255);
            padding: 20px 10px 0px 10px;
            position: relative;

            .title {
              color: #444;
              font-size: 16px;
              font-weight: 900;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .meta {
              position: absolute;
              bottom: 0px;
              right: 8px;
              width: 60%;

              .date {
                position: absolute;
                bottom: 10px;
                right: 10px;
                color: #666;
                font-size: 12px;
              }

              ul {
                width: 150%;
                list-style: none;
                color: #555;
                font-size: 13px;
                font-weight: 900;
                position: absolute;
                bottom: 25px;
                right: 10px;
                padding-left: 40px;

                .keywords {
                  float: right;
                  padding: 2px;
                }
              }
            }

            .text {
              padding-top: 20px;
              text-indent: 25px;
              height: 40%;
              line-height: 180%;
              color: #212529;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }

      .mobile-right {
        height: 95%;
        padding: 0px;
        overflow: hidden;

        .mobilelist {
          height: 20%;
          padding: 10px;
          border: 1px solid #eee;
          position: relative;

          img {
            height: 70%;
            width: 33%;
          }

          .content {
            height: 50%;
            width: 100%;
            background-color: rgb(255, 255, 255);
            padding: 20px 10px 0px 10px;

            .title {
              color: #444;
              font-size: 14px;
              font-weight: 900;
              overflow: hidden;
              text-overflow: ellipsis;
              position: absolute;
              top: 10px;
              right: 10px;
              width: 60%;
            }

            .meta {
              position: absolute;
              bottom: 10px;
              right: 10px;
              width: 60%;

              .date {
                position: absolute;
                bottom: 10px;
                right: 10px;
                color: #666;
                font-size: 12px;
              }

              ul {
                width: 150%;
                list-style: none;
                color: #555;
                font-size: 13px;
                font-weight: 900;
                position: absolute;
                bottom: 25px;
                right: 10px;
                padding-left: 40px;

                .keywords {
                  font-size: 10px;
                  float: right;
                  padding: 2px;
                }
              }
            }
          }
        }
      }
    }

    .software-news {
      height: 900px;
      background-color: #fff;
      border: 1px solid #eee;

      .software-news-header {
        height: 5%;

        .software {
          height: 100%;
          line-height: 45px;
          display: inline-block;
          font-size: 17px;
          font-weight: bold;
          background-color: #fff;
          border-left: 5px solid #f40;
          margin-left: -15px;
          float: left;
          padding: 0 20px;
          color: #00c8fa;
        }

        .more {
          height: 100%;
          line-height: 45px;
          display: inline-block;
          font-size: 18px;
          font-weight: bold;
          background-color: #fff;
          padding: 0 10px;
          float: right;
          color: #00c8fa;
        }
      }

      .software-swiper {
        height: 95%;

        .software-slide {
          height: 20%;

          .softwareList {
            height: 100%;
            padding: 10px;
            border: 1px solid #eee;
            position: relative;

            img {
              height: 70%;
              width: 33%;
            }

            .content {
              height: 50%;
              width: 100%;
              background-color: rgb(255, 255, 255);
              padding: 20px 10px 0px 10px;

              .title {
                color: #444;
                font-size: 14px;
                font-weight: 900;
                overflow: hidden;
                text-overflow: ellipsis;
                position: absolute;
                top: 10px;
                right: 10px;
                width: 60%;
              }

              .meta {
                position: absolute;
                bottom: 10px;
                right: 10px;
                width: 60%;

                .date {
                  position: absolute;
                  bottom: 10px;
                  right: 10px;
                  color: #666;
                  font-size: 12px;
                }

                ul {
                  width: 150%;
                  list-style: none;
                  color: #555;
                  font-size: 13px;
                  font-weight: 900;
                  position: absolute;
                  bottom: 25px;
                  right: 10px;
                  padding-left: 40px;

                  .keywords {
                    font-size: 10px;
                    float: right;
                    padding: 2px;
                  }
                }
              }
            }
          }
        }
      }
    }

    @media (max-width: 992px) {
      .software-news {
        margin-top: 50px;
      }
    }
  }
}

@media (max-width: 992px) {
  .post-section {
    margin-top: 0px;

    .mobile {
      margin-top: 50px;
    }
  }
}
</style>

