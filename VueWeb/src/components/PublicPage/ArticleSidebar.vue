<template>
  <div class="sidebar">
    <div class="art-hot">
      <div class="hd">24小时内最火资讯</div>
      <div class="bd">
        <ul class="bd-wrap">
          <li v-for="hotData in hotList" :key="hotData._id">
            <router-link
              :to="'/article/' + hotData.articleType + '/' + hotData._id"
              class="pic-href"
            >
              <img :src="hotData.imgUrl[0]" :alt="hotData.title">
              <a class="title">{{ hotData.title }}</a>
              <div class="meta">
                <span class="date">{{ hotData.pubtime }}</span>

                <ul class="keywords-wrap">
                  <router-link
                    class="keywords clickword"
                    v-for="(word, index) in hotData.keywords"
                    :key="index"
                                    tag="li"
                :to="{ path: '/keywordslist/' + word }"
                  >{{ word }}</router-link>
                </ul>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="art-hot">
      <div class="hd">三日内热门评论文章</div>
      <div class="bd">
        <ul class="bd-wrap">
          <li v-for="hot3Data in hot3List" :key="hot3Data._id">
            <router-link
              :to="{ path: '/article/' + hot3Data.articleType + '/' + hot3Data._id }"
              class="pic-href"
            >
              <img :src="hot3Data.imgUrl[0]" :alt="hot3Data.title">
              <a class="title">{{ hot3Data.title }}</a>
              <div class="meta">
                <span class="date">{{ hot3Data.pubtime }}</span>
                <ul class="keywords-wrap">
                  <router-link
                    class="keywords clickword"
                    v-for="(word, index) in hot3Data.keywords"
                    :key="index"
                                    tag="li"
                :to="{ path: '/keywordslist/' + word }"
                  >{{ word }}</router-link>
                </ul>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotList: [],
      hot3List: []
    };
  },

  methods: {
    getHotData() {
      let that = this;
      this.axios
        .get("/api/articlelist/hot")
        .then(res => {
          that.hotList = res.data.articleList;
        })
        .catch(err => {
          console.log(err);
        });
      this.axios
        .get("/api/articlelist/hot3")
        .then(res => {
          that.hot3List = res.data.articleList;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  created() {
    this.getHotData();
  }
};
</script>

<style lang="stylus" scoped>
.sidebar {
  .clickword {
    cursor: pointer;
  }

  .clickword:hover {
    color: #00c8fa;
  }

  .art-hot {
    .hd {
      padding: 10px;
      font-size: 20px;
      font-weight: 700;
      color: #0077dd;
    }

    .bd {
      height: 1300px;

      .bd-wrap {
        list-style: none;
        padding: 0px;
        width: 100%;

        li {
          position: relative;

          a {
            text-decoration: none;
          }

          .pic-href {
            height: 180px;
            width: 100%;
            display: block;

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
              color: #000;
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
                bottom: 15px;
                right: 8px;
                color: #aaa;
                font-size: 12px;
              }

              .keywords-wrap {
                width: 100%;
                list-style: none;
                color: #444;
                font-size: 13px;
                position: absolute;
                bottom: 40px;
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
  }
}
</style>