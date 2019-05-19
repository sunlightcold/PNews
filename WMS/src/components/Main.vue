<template>
  <div class="header">
    <el-row>
      <el-col :span="4">
        <el-aside height="100%" style="background-color: rgb(238, 241, 246)">
          <el-menu
            :default-openeds="['1', '2']"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>文章列表
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <router-link :to="{path: '/home/articlelist/news'}" tag="div">最新文章</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link :to="{path: '/home/articlelist/it'}" tag="div">业界文章</router-link>
                </el-menu-item>
                <el-menu-item index="1-3">
                  <router-link :to="{path: '/home/articlelist/mobile'}" tag="div">手机通讯</router-link>
                </el-menu-item>
                <el-menu-item index="1-4">
                  <router-link :to="{path: '/home/articlelist/office'}" tag="div">电脑办公</router-link>
                </el-menu-item>
                <el-menu-item index="1-5">
                  <router-link :to="{path: '/home/articlelist/software'}" tag="div">软件游戏</router-link>
                </el-menu-item>
                <el-menu-item index="1-6">
                  <router-link :to="{path: '/home/articlelist/digital'}" tag="div">新奇数码</router-link>
                </el-menu-item>
                <el-menu-item index="1-7">
                  <router-link :to="{path: '/home/articlelist/science'}" tag="div">科学探索</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>用户管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">
                  <router-link :to="{name: 'userinfo'}" tag="div">用户信息列表</router-link>
                </el-menu-item>
                <el-menu-item index="2-2">管理员账户</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </el-col>
      <el-col :span="20">
        <el-container style="height: 100%; border: 1px solid #eee">
          <el-container :span="12" :offset="6">
            <el-header style="text-align: right; font-size: 12px">
              <router-link :to="{name: 'login'}" tag="span" class="login" v-show="!username">登录</router-link>
              <el-dropdown v-show="username">
                <el-button type="primary">
                  {{username}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><span @click="exitAccount">退出</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-header>

            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: [],
      username: ""
    };
  },
  methods: {
    exitAccount() {

      localStorage.setItem('token', '')
      localStorage.setItem('username', '')


      if(!localStorage.getItem('token')) {

        this.$store.state.username = ''

        this.$message({
          message: '退出账号',
          type: 'success'
        });

        this.$router.push('/')
      }
    }
  },
  created() {
    this.username = localStorage.getItem("username") || "";
  }
};
</script>


<style lang="stylus" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;

  .login {
    cursor: pointer;
  }

  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>
