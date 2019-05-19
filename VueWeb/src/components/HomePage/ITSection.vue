<template>
  <div class="it-section">
    <div class="container">
      <div class="it col-md-12 col-sm-12">
        <div class="it-header">
          <span class="it-title">业界资讯</span>
          <router-link tag="a" class="more" :to="{ path: '/articlelist/it' }">More</router-link>
          <!-- <span class="more">More</span> -->
        </div>
        <div class="it-left col-md-8 col-sm-12 hidden-xs">
          <div class="it-left-top">
            <router-link
              :to="'/article/' + $store.state.itData[0].articleType + '/' + $store.state.itData[0]._id"
              tag="a"
              class="it-href"
            >
              <img :src="$store.state.itData[0].imgUrl[0]" :alt="$store.state.itData[0].title">
              <div class="meta">
                <a class="it-title">{{ $store.state.itData[0].title }}</a>
                <div class="date-word">
                  <span class="date">{{ $store.state.itData[0].pubtime }}</span>
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
              </div>
            </router-link>
          </div>
          <div class="it-left-bottom">
            <div class="it-left-bottom-left">
              <router-link
                :to="'/article/' + $store.state.itData[1].articleType + '/' + $store.state.itData[1]._id"
                tag="a"
              >
                <img :src="$store.state.itData[1].imgUrl[0]" :alt="$store.state.itData[1].title">
                <span class="title">{{ $store.state.itData[1].title }}</span>
                <div class="meta">
                  <span class="date">{{ $store.state.itData[1].pubtime }}</span>
                  <ul>
                    <router-link
                      class="keywords clickword"
                      v-for="(word, index) in $store.state.itData[1].keywords"
                      :key="index"
                      tag="li"
                      :to="{ path: '/keywordslist/' + word }"
                    >{{ word }}</router-link>
                  </ul>
                </div>
              </router-link>
            </div>
            <div class="it-left-bottom-right">
              <router-link
                :to="'/article/' + $store.state.itData[2].articleType + '/' + $store.state.itData[2]._id"
                tag="a"
              >
                <img :src="$store.state.itData[2].imgUrl[0]" :alt="$store.state.itData[2].title">
                <span class="title">{{ $store.state.itData[2].title }}</span>
                <div class="meta">
                  <span class="date">{{ $store.state.itData[2].pubtime }}</span>
                  <ul>
                    <router-link
                      class="keywords clickword"
                      v-for="(word, index) in $store.state.itData[2].keywords"
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
        <div class="it-right col-md-4 hidden-sm col-sm-12">
          <div
            v-for="(itlist, index) in $store.state.itData.slice(15, 20)"
            :key="index"
            class="it-list"
          >
            <router-link
              class="ithref"
              :to="'/article/' + itlist.articleType + '/' + itlist._id"
              tag="a"
            >
              <img :src="itlist.imgUrl[0]" :alt="itlist.title">
              <a class="title">{{ itlist.title }}</a>
              <div class="meta">
                <span class="date">{{ itlist.pubtime }}</span>
                <ul>
                  <router-link
                    class="keywords clickword"
                    v-for="(word, index) in itlist.keywords"
                    :key="index"
                    tag="li"
                    :to="{ path: '/keywordslist/' + word }"
                  >{{ word }}</router-link>
                </ul>
              </div>
            </router-link>
            <div class="swiper-pagination" slot="pagination"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.it-section {
  border: 1px solid #ccc;
  margin-top: 50px;

  .container {
    padding: 0px;

    .it {
      height: 800px;

      .it-header {
        height: 5%;

        .it-title {
          height: 100%;
          line-height: 45px;
          display: inline-block;
          font-size: 17px;
          font-weight: bold;
          background-color: #fff;
          border-left: 5px solid #f40;
          margin-left: 10px;
          float: left;
          padding: 0 20px;
          color: #00c8fa;
        }

        @media (max-width: 750px) {
          .it-title {
            margin-left: 0px;
          }
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

      .clickword {
        cursor: pointer;
      }

      .clickword:hover {
        color: #00c8fa;
      }

      .it-left {
        height: 95%;

        .it-left-top {
          height: 60%;
          padding: 0 10px 10px 10px;

          a {
            text-decoration: none;
          }

          .it-href {
            height: 100%;
            display: block;
            position: relative;

            img {
              width: 100%;
              height: 100%;
              overflow: hidden;
            }

            .meta {
              position: absolute;
              background-color: #000;
              height: 30%;
              opacity: 0.8;
              z-index: 10000;
              bottom: 0px;
              left: 0px;
              width: 100%;

              .it-title {
                position: absolute;
                background-color: #000;
                opacity: 0.8;
                z-index: 10000;
                left: 0px;
                bottom: 65px;
                padding: 10px 20px;
                font-size: 22px;
                font-weight: 900;
                color: #fff;
                width: 100%;
                overflow: hidden; /* 超出部分隐藏 */
                text-overflow: ellipsis; /* 超出部分文字以...显示 */
              }

              .date-word {
                position: absolute;
                z-index: 10000;
                bottom: 0px;
                left: 0px;
                width: 100%;
                color: #fff;
                padding: 5px;

                .date {
                  float: left;
                  padding-left: 20px;
                  font-size: 15px;
                }

                ul {
                  list-style: none;
                  padding-left: 0px;
                  float: right;
                  margin-right: 10px;

                  .keywords {
                    float: right;
                    padding: 0 8px;
                    font-weight: 900;
                    font-size: 15px;
                  }
                }
              }
            }
          }
        }

        .it-left-bottom {
          height: 40%;
          padding: 0 10px 0px 10px;

          .it-left-bottom-left {
            position: relative;
            width: 50%;
            height: 100%;
            display: inline-block;
            padding-right: 5px;

            a {
              img {
                height: 100%;
                width: 100%;
              }

              .title {
                position: absolute;
                z-index: 100000;
                bottom: 10%;
                left: 0;
                font-size: 15px;
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
                height: 10%;
                padding-top: 5px;
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
          }

          .it-left-bottom-right {
            position: relative;
            width: 50%;
            height: 100%;
            display: inline-block;
            padding-left: 5px;

            a {
              img {
                height: 100%;
                width: 100%;
              }

              .title {
                position: absolute;
                z-index: 100000;
                bottom: 10%;
                left: 0;
                font-size: 15px;
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
                height: 10%;
                padding-top: 5px;
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
          }
        }
      }

      .it-right {
        height: 95%;
        padding: 0px;
        background-color: yellow;

        .it-list {
          height: 20%;

          a {
            text-decoration: none;
          }

          .ithref {
            height: 100%;
            width: 100%;
            display: block;
            background-color: #212529;
            position: relative;

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
              top: 15px;
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
                width: 200%;
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
  }
}
</style>

