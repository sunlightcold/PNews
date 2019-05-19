<template>
  <div class="NHeader">
    <!-- Header Top Start -->
    <div class="header-top">
      <div class="topbar text-center container">
        <div class="row">
          <div class="date col-md-2 hidden-sm hidden-xs">
            <i class="glyphicon glyphicon-dashboard" style="color: #fff"></i>
            <span style="color: #fff">&nbsp;&nbsp;星期天,5-12-2019</span>
          </div>
          <!-- <div class="col-md-2 col-sm-2 hidden-xs">
            <i class="glyphicon glyphicon-certificate"></i>
            <span class="weather-degrees">
              20
              <span class="unit">c</span>
            </span>
            <span class="weather-location">- 惠州</span>
          </div> -->
          <div class="col-md-4 col-sm-6 topNav text-left">
            <ul>
              <li>
                <router-link to="/login" tag="a">
                  <i class="glyphicon glyphicon-user"></i>
                  &nbsp;&nbsp;{{ this.$store.state.userNameState }}
                </router-link>
              </li>
              <span class="li-line"></span>
              <li v-if="$store.state.userNameState !== '登录'">
                <a href="#" @click="quitLogin">
                  <i class="glyphicon glyphicon-off"></i>&nbsp;&nbsp;登出
                </a>
              </li>
              <!-- <span class="li-line" v-if="$store.state.userNameState !== '登录'"></span> -->
              <li>
                <a href="#">
                  <i class="glyphicon glyphicon-send"></i>&nbsp;&nbsp;关于
                </a>
              </li>
              <span class="li-line"></span>
              <li>
                <a href="#">&nbsp;&nbsp;Github</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Header Top End -->
    <span class="line"></span>
    <!-- Header Start -->
    <div class="header-section text-center">
      <!-- Header Logo -->
      <div class="container">
        <div class="header-news">
          <a href="#" class="header-logo">
            <img src="../../assets/img/PNews.png" alt="Logo">
          </a>
          <a href="#" class="header-title">
            <!-- <img src="../../assets/img/PNews.jpg" alt="Header Banner"> -->
            <p>让IT资讯更简单</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Header End -->
    <!-- Menu Section Start  -->
    <nav class="navbar navbar-inverse" style="border-radius: 0px; margin-bottom: 1px">
      <div class="container">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" to="/">PNews</router-link>
        </div>
        <div
          id="navbar"
          class="navbar-collapse collapse"
          aria-expanded="false"
          style="height: 1px;"
        >
          <ul class="nav navbar-nav">
            <li :class="{ active: tellRoute() == '/'}">
              <router-link :to="'/'" tag="a">首页</router-link>
            </li>
            <li :class="{ active: tellRoute() == '/articlelist/news'}">
              <router-link :to="'/articlelist/news'" tag="a">最新资讯</router-link>
            </li>
            <li :class="{ active: tellRoute() == '/articlelist/it'}">
              <router-link :to="'/articlelist/it'" tag="a">业界</router-link>
            </li>
            <li :class="{ active: tellRoute() == '/articlelist/mobile'}">
              <router-link :to="'/articlelist/mobile'" tag="a">手机通信</router-link>
            </li>
            <li :class="{ active: tellRoute() == '/articlelist/office'}">
              <router-link :to="'/articlelist/office'" tag="a">电脑办公</router-link>
            </li>
            <li :class="{ active: tellRoute() == '/articlelist/digital'}">
              <router-link :to="'/articlelist/digital'" tag="a">新奇数码</router-link>
            </li>
            <li :class="{ active: tellRoute() == '/articlelist/software'}">
              <router-link :to="'/articlelist/software'" tag="a">软件游戏</router-link>
            </li>
            <li :class="{ active: tellRoute() == '/articlelist/science'}">
              <router-link :to="'/articlelist/science'" tag="a">科学探索</router-link>
            </li>
          </ul>
        </div>
        <!-- /.nav-collapse -->
      </div>
      <!-- /.container -->
    </nav>
    <!-- Menu Section End  -->
    <!-- Breaking News Section Start -->
    <div class="breaking-news-section">
      <div class="container">
        <!-- Breaking News Wrapper Start -->
        <div class="breaking-news-wrapper">
          <!-- Breaking News Title -->
          <div class="breaking-news-title text-center col-md-2 col-sm-3 col-xs-12">Breaking News</div>

          <!-- Breaking Newsticker Start -->
          <div class="breaking-news-ticker col-md-7 col-sm-6 col-xs-12">
            <transition-group tag="ul" name="breakingNew" class="text-center">
              <li
                v-for="(breakingNew, index) in $store.state.newsData"
                :key="index"
                v-show="index === mark"
                class="text-left"
              >
                <router-link
                  :to="'/article/' + breakingNew.articleType + '/' + breakingNew._id"
                  tag="a"
                  class="text"
                >
                  <p>{{ breakingNew.title }}</p>
                </router-link>
              </li>
            </transition-group>
          </div>
          <!-- 搜索框 -->
          <div class="search-wrap col-md-3 col-sm-3 col-xs-12">
            <div class="search-box">
              <input
                type="text"
                class="search"
                v-model="searchword"
                @keyup.enter="getKeyInfo"
                placeholder="输入搜索关键词"
              >
              <i class="glyphicon glyphicon-search search-icon" @click="getKeyInfo"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breaking News Section End -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      mark: 0, //比对图片索引的变量
      searchword: ""
    };
  },
  methods: {
    autoPlay() {
      if (this.mark === this.$store.state.newsData) {
        //当遍历到最后
        this.mark = 0;
      }
      this.mark++;
    },
    play() {
      setInterval(this.autoPlay, 4000);
    },
    tellRoute() {
      return this.$route.path;
    },
    getKeyInfo() {
      this.$router.push({ path: "/keywordslist/" + this.searchword });
    },
    //退出登录
    quitLogin() {
      var cookies = document.cookie.split(";"); //将所有cookie键值对通过分号分割为数组

      //循环遍历所有cookie键值对
      for (var i = 0; i < cookies.length; i++) {
        //有些cookie键值对前面会莫名其妙产生一个空格，将空格去掉
        if (cookies[i].indexOf(" ") == 0) {
          cookies[i] = cookies[i].substring(1);
        }

        //比较每个cookie的名称，找到要删除的那个cookie键值对
        if (cookies[i].indexOf("username") == 0) {
          var exp = new Date(); //获取客户端本地当前系统时间
          exp.setTime(exp.getTime() - 60 * 1000); //将exp设置为客户端本地时间1分钟以前，将exp赋值给cookie作为过期时间后，就表示该cookie已经过期了, 那么浏览器就会将其立刻删除掉

          document.cookie = cookies[i] + ";expires=" + exp.toUTCString(); //设置要删除的cookie的过期时间，即在该cookie的键值对后面再添加一个expires键值对，并将上面的exp赋给expires作为值(注意expires的值必须为UTC或者GMT时间，不能用本地时间），那么浏览器就会将该cookie立刻删除掉
        } //注意document.cookie的用法很巧妙，在对其进行赋值的时候是设置单个cookie的信息，但是获取document.cookie的值的时候是返回所有cookie的信息

        this.$store.state.userNameState = "登录";
      }
    }
  },
  created() {
    this.play();
    this.weather();
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.NHeader {
  .header-top {
    .topbar {
      height: 40px;
      line-height: 40px;
      padding: 0px 15px;
      border-radius: 5px;
      background-color: #fff;

      .row {
        height: 100%;
        background-color: #fff;

        .date {
          background-color: #00c8fa;
          height: 100%;

          a {
            color: #fffdff;
          }
        }

        .topNav {
          ul {
            li {
              padding: 0px 5px;
              list-style: none;
              float: left;
            }

            .li-line {
              float: left;
              display: block;
              width: 1px;
              height: 20px;
              margin-top: 10px;
              background-color: #ccc;
            }
          }
        }
      }
    }
  }

  .line {
    display: block;
    width: 100%;
    border-bottom: 1px solid #ccc;
  }

  .header-section {
    height: 60px;

    .container {
      padding: 0;
      height: 100%;

      .header-news {
        height: 100%;
        width: 100%;
        display: inline-block;

        .header-logo {
          height: 100%;
          float: left;
          text-decoration: none;

          img {
            height: 100%;
          }
        }

        .header-title {
          display: inline-block;
          height: 100%;
          width: 50%;
          padding: 0 20px;
          float: left;
          text-align: left;
          text-decoration: none;

          p {
            height: 100%;
            line-height: 60px;
            font-size: 22px;
            font-weight: 700;
            margin: 0;
            color: #222222;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .header-section {
      margin-bottom: 5px;
      box-sizing: border-box;
    }
  }

  .breaking-news-section {
    background-color: #00C8FA;

    .container {
      padding: 0px;

      .breaking-news-wrapper {
        .breaking-news-title {
          display: block;
          background-color: #f05555;
          line-height: 40px;
          color: #fff;
          font-size: 15px;
          font-weight: bold;
        }

        .breaking-news-ticker {
          background-color: #00C8FA;
          height: 40px;
          overflow: hidden;

          ul {
            line-height: 40px;
            overflow: hidden;
            color: #fff;

            li {
              width: 100%;
              list-style: none;

              .text {
                text-decoration: none;

                p {
                  color: #fff;
                  font-size: 15px;
                  font-weight: 700;
                  letter-spacing: 2px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }

          .breakingNew-enter-active {
            transform: translateY(0);
            transition: all 0.5s ease;
          }

          .breakingNew-leave-active {
            transform: translateY(-100%);
            transition: all 1s ease;
          }
        }
      }

      .search-wrap {
        height: 30px;
        margin: 5px 0px;

        .search-box {
          height: 100%;
          width: 100%;
          position: relative;

          .search {
            height: 100%;
            width: 100%;
            padding: 0 10px 0 5px;
            border-radius: 5%;
            background-color: #eee;
          }

          .search:focus {
            border-bottom: 1px solid #444;
            background-color: #fff;
          }

          .search-icon {
            height: 100%;
            position: absolute;
            right: 0px;
            padding-right: 8px;
            font-size: 18px;
            line-height: 30px;
            cursor: pointer;
          }

          .search-icon:hover {
            color: #f40;
          }
        }
      }
    }
  }
}
</style>
