<template>
  <div class="post-section">
    <div class="container">
      <div class="recommend-news col-md-8 col-sm-12">
        <div class="recommend-news-header">
          <span class="recommend">最新资讯</span>
          <router-link tag="a" class="more" :to="{ path: '/articlelist/news' }">More</router-link>
          <!-- <router-link class="more" tag="span">More</router-link> -->
        </div>
        <div class="recommend-left col-md-6 col-sm-6 col-xs-12">
          <router-link
            :to="'/article/' + $store.state.newsData[0].articleType + '/' + $store.state.newsData[0]._id"
            tag="a"
          >
            <div class="newList">
              <img :src="$store.state.newsData[0].imgUrl[0]" :alt="$store.state.newsData[0].title">
              <div class="content">
                <div class="title">{{ $store.state.newsData[0].title }}</div>
                <div class="meta">
                  <span class="date">{{ $store.state.newsData[0].pubtime }}</span>
                  <ul>
                    <router-link
                      class="keywords clickword"
                      v-for="(word, index) in $store.state.newsData[0].keywords"
                      :key="index"
                      tag="li"
                      :to="{ path: '/keywordslist/' + word }"
                    >{{ word }}</router-link>
                  </ul>
                </div>
                <div class="text">{{ $store.state.newsData[0].contentText[0] }}</div>
              </div>
            </div>
          </router-link>
          <router-link
            :to="'/article/' + $store.state.newsData[1].articleType + '/' + $store.state.newsData[1]._id"
            tag="a"
          >
            <div class="newList">
              <img :src="$store.state.newsData[1].imgUrl[0]" :alt="$store.state.newsData[1].title">
              <div class="content">
                <div class="title">{{ $store.state.newsData[1].title }}</div>
                <div class="meta">
                  <span class="date">{{ $store.state.newsData[1].pubtime }}</span>
                  <ul>
                    <router-link
                      class="keywords clickword"
                      v-for="(word, index) in $store.state.newsData[1].keywords"
                      :key="index"
                      tag="li"
                      :to="{ path: '/keywordslist/' + word }"
                    >{{ word }}</router-link>
                  </ul>
                </div>
                <div class="text">{{ $store.state.newsData[1].contentText[0] }}</div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="recommend-right col-md-6 col-sm-6 hidden-xs">
          <div
            class="newList"
            v-for="(newlist, index) in $store.state.newsData.slice(10, 15)"
            :key="index"
          >
            <router-link :to="'/article/' + newlist.articleType + '/' + newlist._id" tag="a">
              <img :src="newlist.imgUrl[0]" :alt="newlist.title">
              <div class="content">
                <div class="title">{{ newlist.title }}</div>
                <div class="meta">
                  <span class="date">{{ newlist.pubtime }}</span>
                  <ul>
                    <router-link
                      class="keywords clickword"
                      v-for="(word, index) in newlist.keywords"
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
      </div>
      <div class="breaking-news col-md-4 col-sm-12">
        <div class="breaking-news-header">
          <span class="breaking">新奇数码</span>
          <router-link tag="a" class="more" :to="{ path: '/articlelist/digital' }">More</router-link>
          <!-- <span class="more">More</span> -->
        </div>
        <!-- swiper -->
        <swiper :options="swiperOption" class="digital-swiper">
          <swiper-slide
            class="digital-slide"
            v-for="(digitallist, index) in $store.state.digitalData"
            :key="index"
          >
            <router-link
              :to="'/article/' + digitallist.articleType + '/' + digitallist._id"
              class="digitalList"
              tag="div"
              v-if="digitallist.articleType"
            >
              <img :src="digitallist.imgUrl[0]" :alt="digitallist.title">
              <div class="content">
                <div class="title">{{ digitallist.title }}</div>
                <div class="meta">
                  <span class="date">{{ digitallist.pubtime }}</span>
                  <ul>
                    <router-link
                      class="keywords clickword"
                      v-for="(word, index) in digitallist.keywords"
                      :key="index"
                      tag="li"
                      :to="{ path: '/keywordslist/' + word }"
                    >{{ word }}</router-link>
                  </ul>
                </div>
              </div>
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
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
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
.post-section {
  border: 1px solid #ccc;

  .clickword {
    cursor: pointer;
  }

  .clickword:hover {
    color: #00c8fa;
  }

  .container {
    .recommend-news {
      height: 900px;
      padding: 0px;

      .recommend-news-header {
        height: 5%;

        .recommend {
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

      .recommend-left {
        height: 95%;
        padding: 0px;

        a {
          text-decoration: none;

          .newList {
            height: 50%;
            padding: 10px;
            border: 1px solid #eee;

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
      }

      .recommend-right {
        height: 95%;
        padding: 0px;
        overflow: hidden;

        .newList {
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

    .breaking-news {
      height: 900px;
      background-color: #fff;
      border: 1px solid #eee;

      .breaking-news-header {
        height: 5%;

        .breaking {
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

      .digital-swiper {
        height: 95%;

        .digital-slide {
          height: 20%;

          .digitalList {
            height: 100%;
            padding: 10px;
            border: 1px solid #eee;
            position: relative;
            cursor: pointer;

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
      .breaking-news {
        margin-top: 50px;
      }
    }
  }
}

@media (max-width: 992px) {
  .post-section {
    margin-top: 50px;
  }
}
</style>

