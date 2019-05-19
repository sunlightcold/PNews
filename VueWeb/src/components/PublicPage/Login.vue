<template>
  <div class="login">
    <div class="NHeader">
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
    </div>
    <div class="login-wrap">
      <div class="login-header">
        <ul>
          <li @click="changeShowLogin('login')" :class="{active: showLogin}">登录</li>
          <li @click="changeShowLogin('register')" :class="{active: showRegister}">注册</li>
        </ul>
      </div>
      <div class="input-wrap">
        <div class="login-list" v-show="showLogin">
          <input
            type="text"
            placeholder="UserName"
            v-model="userLoginName"
            ref="rloginname"
            @focus="clearError('rloginname')"
          >
          <input
            type="password"
            placeholder="password"
            v-model="userPassword"
            ref="rloginpwd"
            @focus="clearError('rloginpwd')"
          >
          <input
            type="button"
            value="Login"
            class="btn btn-primary"
            ref="rlogin"
            @click="userLogin"
          >
          <input
            type="button"
            v-model="loginTip"
            class="btn btn-danger"
            v-show="tipShow"
            ref="rloginTip"
          >
          <img
            src="../../assets/img/loading.gif"
            alt="加载中..."
            class="loading-gif"
            v-if="showLoading"
          >
        </div>
        <div class="register-list" v-show="showRegister">
          <input
            type="text"
            placeholder="UserName"
            v-model="userName"
            ref="ruserName"
            @focus="clearError('ruserName')"
          >
          <input
            type="password"
            placeholder="输入密码"
            v-model="password1"
            ref="rpassword1"
            @focus="clearError('rpassword1')"
          >
          <input
            type="password"
            placeholder="确认密码"
            v-model="password2"
            ref="rpassword2"
            @focus="clearError('rpassword2')"
          >
          <input
            type="email"
            placeholder="邮箱"
            v-model="email"
            ref="remail"
            @focus="clearError('remail')"
          >
          <input type="button" value="发送验证码" @click="getEmailCode" class="btn btn-info" ref="dis">
          <input
            type="text"
            placeholder="邮箱验证码"
            v-model="emailCode"
            ref="remailCode"
            @focus="clearError('remailCode')"
          >
          <input type="button" value="register" class="btn btn-primary" @click="userRegister">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: true,
      showRegister: false,
      userName: "",
      password1: "",
      password2: "",
      email: "",
      emailCode: "",
      registerCode: false,
      loginCode: false,
      userLoginName: "",
      userPassword: "",
      loginTip: "用户名或密码错误",
      tipShow: false,
      showLoading: false
    };
  },
  methods: {
    tellRoute() {
      return this.$route.path;
    },

    changeShowLogin(param) {
      if (param == "login") {
        this.showLogin = true;
        this.showRegister = false;
      } else {
        this.showLogin = false;
        this.showRegister = true;
      }
    },

    changeDisabled() {
      this.$refs.dis.setAttribute("disabled", "disabled");
      let time = 10;
      this.$refs.dis.setAttribute("value", `再次发送（ ${time}s）`);
      this.$refs.dis.setAttribute("class", "btn btn-danger");
      let timer = setInterval(() => {
        time--;
        if (time < 0) {
          this.$refs.dis.setAttribute("value", `发送验证码`);
          this.$refs.dis.setAttribute("class", "btn btn-info");
          this.$refs.dis.removeAttribute("disabled");
          clearInterval(timer);
        } else {
          this.$refs.dis.setAttribute("value", `再次发送（ ${time}s）`);
        }
      }, 1000);
    },

    //验证邮箱格式
    checkEmail(str) {
      var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },

    //验证帐号是否合法
    //验证规则：字母、数字、下划线组成，字母开头，4-16位。
    checkUser(str) {
      var re = /^[a-zA-z]\w{3,15}$/;

      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },

    clearError(refName) {
      this.$refs[refName].removeAttribute("class");
    },

    userRegister() {
      if (this.userName == "") {
        this.$refs.ruserName.setAttribute("placeholder", "请输入用户名");
        this.$refs.ruserName.setAttribute("class", "input-error");
        this.registerCode = false;
      } else {
        if (this.checkUser(this.userName)) {
          this.registerCode = true;
        } else {
          this.registerCode = false;
          this.userName = "";
          this.$refs.ruserName.setAttribute(
            "placeholder",
            "用户名字母开头，4-16位"
          );
          this.$refs.ruserName.setAttribute("class", "input-error");
        }
      }

      if (this.password1 == "") {
        this.$refs.rpassword1.setAttribute("placeholder", "请输入密码");
        this.$refs.rpassword1.setAttribute("class", "input-error");
        this.registerCode = false;
      } else {
        this.registerCode = true;
      }

      if (this.password2 == "") {
        this.$refs.rpassword2.setAttribute("placeholder", "请确认密码");
        this.$refs.rpassword2.setAttribute("class", "input-error");
        this.registerCode = false;
      } else {
        if (this.password1 === this.password2) {
          this.registerCode = true;
        } else {
          this.registerCode = false;
          this.password2 = "";
          this.$refs.rpassword2.setAttribute("placeholder", "密码不一致");
          this.$refs.rpassword2.setAttribute("class", "input-error");
        }
      }

      if (this.email == "") {
        this.$refs.remail.setAttribute("placeholder", "请输入邮箱");
        this.$refs.remail.setAttribute("class", "input-error");
        this.registerCode = false;
      } else {
        if (this.checkEmail(this.email)) {
          this.registerCode = true;
        } else {
          this.registerCode = false;
          this.email = "";
          this.$refs.remail.setAttribute("placeholder", "邮箱格式错误");
          this.$refs.remail.setAttribute("class", "input-error");
        }
      }

      if (this.emailCode == "") {
        this.$refs.remailCode.setAttribute("placeholder", "请输入验证码");
        this.$refs.remailCode.setAttribute("class", "input-error");
        this.registerCode = false;
      } else {
        this.registerCode = true;
      }

      //验证通过
      if (this.registerCode) {
        let that = this;
        this.axios
          .post("/api/register/", {
            userName: that.userName,
            userpwd: that.password1,
            email: that.email,
            emailCode: that.emailCode
          })
          .then(res => {
            console.log(res.data);
            if (res.data.status === 300) {
              this.registerCode = false;
              this.email = "";
              this.$refs.remail.setAttribute("placeholder", "邮箱已注册");
              this.$refs.remail.setAttribute("class", "input-error");
            } else if (res.data.status == 301) {
              this.registerCode = false;
              this.emailCode = "";
              this.$refs.remailCode.setAttribute("placeholder", "验证码错误");
              this.$refs.remail.setAttribute("class", "input-error");
            } else if (res.data.status == 303) {
              this.registerCode = false;
              this.emailCode = "";
              this.$refs.remailCode.setAttribute("placeholder", "验证码失效");
              this.$refs.remail.setAttribute("class", "input-error");
            } else if (res.data.status == 304) {
              this.registerCode = false;
              this.email = "";
              this.$refs.remail.setAttribute("placeholder", "邮箱不可达");
              this.$refs.remail.setAttribute("class", "input-error");
            } else if (res.data.status == 302) {
              //注册成功，跳转login
              this.changeShowLogin("login");
              this.$refs.rlogin.setAttribute("class", "btn btn-success");
              setTimeout(() => {
                this.$refs.rlogin.setAttribute("class", "btn btn-primary");
              }, 1000);
              this.$refs.rlogin.setAttribute("value", "注册成功");
              this.email = "";
              this.userName = "";
              this.password1 = "";
              this.password2 = "";
              this.emailCode = "";
            }
          })
          .catch(err => {
            console.log("服务器错误，注册失败");
          });
      }
    },

    //验证登录
    userLogin() {
      if (this.userLoginName == "") {
        this.loginCode = false;
        this.$refs.rloginname.setAttribute("placeholder", "请输入用户名");
        this.$refs.rloginname.setAttribute("class", "input-error");
      } else {
        this.loginCode = true;
      }

      if (this.userPassword == "") {
        this.loginCode = false;
        this.$refs.rloginpwd.setAttribute("placeholder", "请输入密码");
        this.$refs.rloginpwd.setAttribute("class", "input-error");
      } else {
        this.loginCode = true;
      }

      if (this.loginCode) {
        // console.log('ceshi')
        let that = this;
        this.axios
          .post("/api/login", {
            username: that.userLoginName,
            userpwd: that.userPassword
          })
          .then(res => {
            let data = res.data;
            console.log(data);

            //201 登录成功
            if (data.status == 201) {
              that.loginTip = data.info;
              that.tipShow = true;
              that.$refs.rloginTip.setAttribute("class", "btn btn-success");
              that.$store.commit("updateUserName", that.userLoginName);
              that.showLoading = true;
              setTimeout(() => {
                that.tipShow = false;

              }, 700);
              setTimeout(() => {
                that.showLoading = false;
                that.$router.push({
                  path: `/`
                });
              }, 1500);

              //202 用户名或密码错误
            } else if (data.status == 202) {
              that.tipShow = true;
              that.loginTip = data.info;
              that.$refs.rloginTip.setAttribute("class", "btn btn-danger");
              setTimeout(() => {
                that.tipShow = false;
              }, 1000);
            }
          })
          .catch(err => {
            console.log("请求失败，登录错误");
          });
      }
    },
    //发送邮件
    getEmailCode() {
      let that = this;
      this.axios
        .post("/api/getEmailCode/", {
          email: that.email
        })
        .then(res => {
          if (res.data.status == 502) {
            this.changeDisabled();
          } else if (res.data.status === 300) {
            this.registerCode = false;
            this.email = "";
            this.$refs.remail.setAttribute("placeholder", "邮箱已注册");
            this.$refs.remail.setAttribute("class", "input-error");
          }
        })
        .catch(err => {
          if (err) {
            that.$refs.dis.setAttribute("value", `邮箱无效！`);
            this.$refs.dis.setAttribute("class", "btn btn-danger");
            setTimeout(() => {
              that.$refs.dis.setAttribute("value", `发送验证码`);
              this.$refs.dis.setAttribute("class", "btn btn-info");
            }, 1000);
            console.log("请求失败");
          }
        });
    }
  },
  computed: {
    userNameState() {
      return this.$store.state.userNameState;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.login {
  .NHeader {
    margin-top: 20px;

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
      }
    }
  }

  .login-wrap {
    height: 500px;
    width: 400px;
    margin: 0 auto;
    background-color: #444;

    .login-header {
      width: 100%;
      height: 50px;

      ul {
        width: 100%;
        padding: 0;
        list-style: none;

        li {
          cursor: pointer;
          width: 50%;
          color: #eee;
          text-align: center;
          float: left;
          height: 50px;
          font-size: 20px;
          font-weight: 900;
          line-height: 50px;
          border: 1px solid #eee;
        }

        .active:hover {
          color: #fff;
          background-color: #286090;
        }

        .active {
          color: #fff;
          background-color: #286090;
        }
      }
    }

    .input-wrap {
      width: 100%;

      .input-error {
        border: 2px red solid;
        color: red;
      }

      .login-list {
        padding: 50px;
        width: 100%;
        position: relative;

        input {
          width: 100%;
          margin: 20px 0px;
          height: 40px;
          padding-left: 10px;
        }

        .loading-gif {
          width: 50%;
          height: 10px;
          position: absolute;
          left: 50%;
          bottom: 30px;
          transform: translateX(-50%);
          background-color: #286090;
        }
      }

      .register-list {
        padding: 15px 50px;

        input {
          width: 100%;
          margin: 10px 0px;
          height: 40px;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
