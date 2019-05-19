<template>
  <div class="article-inner container">
    <div class="content-box col-md-8">
      <div class="article-box">
        <h1 class="title">{{ articleData.title }}</h1>
        <div class="art-info">
          <div class="content-info">
            <span class="pubtime">{{ articleData.pubtime }}</span>
            <span class="source">{{ articleData.source }}</span>
            <span class="author">{{ articleData.author }}</span>
          </div>
          <div class="keywords">
            <ul>
              <li class="key">keywords：</li>
              <router-link
                v-for="(word ,index) in articleData.keywords"
                :key="index"
                class="clickword"
                tag="li"
                :to="{ path: '/keywordslist/' + word }"
              >{{ word }}</router-link>
            </ul>
          </div>
          <div class="content">
            <div v-for="(content, index) in contentList" :key="index">
              <p class="text" v-show="UrlOrContent(content)">{{ content }}</p>
              <div class="pic-wrap" v-show="UrlOrContent(content) == false">
                <img class="pic-url img-responsive img-thumbnail" :src="content">
              </div>
            </div>

            <div class="like">
              <div
                class="btn btn-danger left"
                style="margin-left: 20px"
                v-if="ifLogin"
                ref="rinfo"
              >未登录！</div>
              <i
                :class="{'glyphicon': true, 'glyphicon-heart': true, 'like-icon': true, 'like-toggle': likeflag}"
                @click="setLike"
              ></i>
              <span class="like-title">Like({{ like }})</span>
            </div>
          </div>
          <article-comment :comment-info="commentInfo"></article-comment>
        </div>
      </div>
    </div>
    <div class="right-box col-md-4 hidden-xs hidden-sm">
      <article-sidebar></article-sidebar>
    </div>
  </div>
</template>

<script>
import ArticleSidebar from "@/components/PublicPage/ArticleSidebar.vue";
import ArticleComment from "@/components/DetailPage/ArticleComment.vue";

export default {
  inject: ["reload"],
  components: {
    ArticleSidebar,
    ArticleComment
  },
  data() {
    return {
      articleData: [],
      contentList: [],
      commentInfo: {},
      ifLogin: false,
      like: 0,
      likeflag: true
    };
  },

  methods: {
    UrlOrContent: function(content) {
      let judge = content.match(/https:\/\//g);
      //true 文本
      //false url
      return judge == null;
    },
    getData() {
      let that = this;
      this.axios
        .post("/api/" + that.$route.params.articleType, {
          _id: that.$route.params.id
        })
        .then(function(response) {
          // console.log(response);
          that.articleData = response.data.articleData;
          that.contentList = that.articleData.contentlist;
          that.like = that.articleData.like;
          that.likeflag = response.data.likefalg
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setLike() {
      // console.log('测试')
      if (this.$store.state.userNameState == "登录") {
        this.ifLogin = true;
        setTimeout(() => {
          this.ifLogin = false;
        }, 1000);
      } else {
        let that = this;
        this.axios
          .post("/api/like", {
            articleid: that.articleData._id,
            username: that.$store.state.userNameState,
            articletype: that.articleData.articleType
          })
          .then(res => {
            // console.log(res.data);
            that.like = res.data.like;
            // console.log(that.like)
            that.likeflag = res.data.likefalg;
            // console.log(res.data.likefalg)
            that.reload()
          })
          .catch(err => {
            console.log("请求错误！");
          });
      }
    }
  },
  created() {
    this.getData();
    this.commentInfo.articleId = this.$route.params.id;
    this.commentInfo.articleType = this.$route.params.articleType;
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      this.commentInfo.articleId = this.$route.params.id;
      this.commentInfo.articleType = this.$route.params.articleType;

      if (this.$route.name == "detail" || this.$route.name == "list") {
        this.getData();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.article-inner {
  margin-top: 30px;
  padding: 0;

  .content-box {
    .article-box {
      position: relative;

      .title {
        font-size: 28px;
        font-weight: 700;
        text-align: center;
        line-height: 42px;
      }

      .art-info {
        position: absolute;
        width: 100%;
        text-align: center;
        height: 10%;
        max-width: 100%;
        left: 50%;
        transform: translateX(-50%);

        .content-info {
          span {
            display: inline-block;
            margin: 0 7px;
            line-height: 24px;
            font-size: 12px;
            vertical-align: middle;
            height: 24px;
          }

          .pubtime {
          }

          .source {
          }

          .author {
          }
        }

        .keywords {
          position: relative;
          width: 100%;
          height: 10%;
          padding: 10px;

          ul {
            list-style: none;
            padding: 0;
            /* 弹性盒模型 */
            display: flex;
            /* 主轴居中对齐 */
            justify-content: center;
            /* 侧轴居中对齐 */
            align-items: center;

            .key {
              font-size: 20px;
              font-weight: 700;
              line-height: 20px;
              background-color: #fff;
              color: #000;
            }

            li {
              float: left;
              padding: 5px;
              line-height: 20px;
              border: 2px solid #fff;
              background-color: #FFD700;
              border-radius: 10px;
              color: #000;
              font-weight: 700;
            }

            .clickword {
              cursor: pointer;
            }

            .clickword:hover {
              color: #00c8fa;
            }
          }
        }

        .content {
          text-align: left;
          margin-top: 50px;

          .text {
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
          }

          .pic-wrap {
            width: 100%;
            /* 弹性盒模型 */
            display: flex;
            /* 主轴居中对齐 */
            justify-content: center;

            .pic-url {
             height: 400px
            }
          }

          @media (max-width: 768px) {
            .pic-wrap {
              width: 100%;
              padding-bottom: 80%;
              position: relative;

              .pic-url {
                position: absolute;
                padding: 0;
                width: 90%;
                height: 100%;
                left: 50%;
                transform: translateX(-50%);
                top: 0;
              }
            }
          }

          .like {
            height: 30px;
            line-height: 30px;
            float: right;
            margin-right: 20px;
            width: 100%;

            .like-title {
              font-size: 10px;
              font-weight: 700;
              float: right;
              padding-right: 10px;
            }

            .like-icon {
              float: right;
              font-size: 30px;
              line-height: 30px;
              color: #444;
              cursor: pointer;
            }

            .like-toggle {
              color: #f40 !important;
            }
          }
        }
      }
    }
  }
}
</style>