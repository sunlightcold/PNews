<template>
  <div class="article-list">
    <div class="container">
      <div class="article-list-wrap container">
        <div class="art-list col-md-8">
          <h1 v-if="!ifLength" v-show="articleList">搜索内容为空</h1>
          <ul>
            <li v-for="datalist in articleList" :key="datalist._id" class="art-list-wrap">
              <router-link
                tag="a"
                :to="{ path: '/article/' + datalist.articleType + '/' + datalist._id }"
                class="content-wrap"
              >
                <div class="pic-wrap">
                  <img :src="datalist.imgUrl[0]" :alt="datalist.title" class="art-pic">
                </div>
                <div class="art-wrap">
                  <p class="title">{{ datalist.title }}</p>
                  <div class="art-content">{{ datalist.contentText[0].slice(0, 50) + '...' }}</div>
                  <div class="meta">
                    <p class="pubtime hidden-xs">{{ datalist.pubtime }}</p>
                    <div class="keywords">
                      <ul>
                        <router-link
                          class="word clickword"
                          v-for="(word, index) in datalist.keywords"
                          :key="index"
                          tag="li"
                          :to="{ path: '/keywordslist/' + word }"
                        >{{ word }}</router-link>
                      </ul>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="right-box col-md-4 hidden-xs hidden-sm">
          <article-sidebar></article-sidebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleSidebar from "@/components/PublicPage/ArticleSidebar.vue";

export default {
  components: {
    ArticleSidebar
  },

  data() {
    return {
      articleList: [],
      articleType: "",
      ifLength: 0
    };
  },
  methods: {
    getkeysArticle(key) {
      let that = this;
      this.axios
        .post("/api/keyslist/", {
          keyword: key
        })
        .then(res => {
          //   console.log(res.data);
          that.articleList = res.data.articleList;
          that.ifLength = that.articleList.length;
        })
        .catch(err => {
          console.log("keyword err");
        });
    }
  },
  created() {
    this.getkeysArticle(this.$route.params.keyword);
  },

  watch: {
    $route(to, from) {
      //监听路由是否变化
      //   console.log(this.$route)
      if (this.$route.name == "keywordslist") {
        this.getkeysArticle(this.$route.params.keyword);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.article-list {
  .container {
    height: 600px;
    padding: 0;

    .clickword {
      cursor: pointer;
    }

    .clickword:hover {
      color: #00c8fa;
    }

    .article-swiper {
      margin-top: 40px;
      height: 0;
      position: relative;
      width: 100%;
      padding-bottom: 25%;
      background-color: rgba(0, 0, 0, 0.8);

      .section-middle-swiper {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;

        .swiper-list {
          width: 100%;

          img {
            width: 40%;
            height: 100%;
            overflow: hidden;
            float: right;
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
            font-size: 18px;
          }

          .meta {
            float: left;
            width: 60%;

            a {
              text-decoration: none;
            }

            .newtitle {
              position: absolute;
              z-index: 10000;
              left: 0px;
              top: 40px;
              font-size: 18px;
              font-weight: 900;
              color: #fff;
              width: 60%;
              padding: 5px 20px;
              box-sizing: border-box;
              -moz-box-sizing: border-box; /* Firefox */
              -webkit-box-sizing: border-box; /* Safari */
              overflow: hidden; /* 超出部分隐藏 */
              text-overflow: ellipsis; /* 超出部分文字以...显示 */
            }

            .content-wrap {
              position: absolute;
              top: 50%;
              left: 0;
              width: 60%;
              heigth: 100%;
              transform: translateY(-30%);

              .content-text {
                line-height: 25px;
                padding: 5px 20px;
                text-indent: 30px;
                color: #eee;
                overflow: hidden; /* 超出部分隐藏 */
                text-overflow: ellipsis; /* 超出部分文字以...显示 */
              }
            }

            .article-date {
              position: absolute;
              bottom: 0;
              width: 60%;
              color: #fff;

              .date {
                float: left;
                padding-left: 20px;
              }

              ul {
                list-style: none;
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
    }

    .article-list-wrap {
      margin-top: 20px;
      padding: 0px;

      .art-list {
        padding: 0;

        ul {
          list-style: none;
          padding: 0;

          .art-list-wrap {
            width: 100%;
            height: 200px;
            border-bottom: 3px dotted #EEE;

            .content-wrap {
              cursor: pointer;

              .pic-wrap {
                width: 40%;
                height: 100%;
                position: relative;
                display: inline-block;

                .art-pic {
                  padding: 5px;
                  height: 80%;
                  width: 100%;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }

              .art-wrap {
                display: inline-block;
                height: 100%;
                width: 60%;
                float: right;
                padding: 20px 10px 10px 10px;
                position: relative;

                .title {
                  width: 100%;
                  font-size: 17px;
                  font-weight: 700;
                  color: #444;
                }

                .art-content {
                  height: 66px;
                  overflow: hidden;
                  color: #989898;
                  display: inline-block;
                  position: absolute;
                  top: 50%;
                  width: 100%;
                  padding-right: 10px;
                  text-indent: 27px;
                  transform: translateY(-50%);
                  line-height: 22px;
                }

                .meta {
                  width: 100%;
                  position: absolute;
                  left: 0px;
                  bottom: 20px;

                  .pubtime {
                    float: left;
                    padding-left: 10px;
                    color: #989898;
                  }

                  .keywords {
                    ul {
                      list-style: none;
                      padding: 0;

                      .word {
                        font-weight: 700;
                        float: right;
                        padding-right: 10px;
                      }
                    }
                  }
                }

                @media (max-width: 768px) {
                  .title {
                    white-space: nowrap;
                    overflow: hidden; /* 超出部分隐藏 */
                    text-overflow: ellipsis; /* 超出部分文字以...显示 */
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
