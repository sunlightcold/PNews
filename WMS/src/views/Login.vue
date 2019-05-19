<template>
  <el-container>
    <el-main>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="1">管理员：</el-col>
        <el-col :span="5">
          <el-input placeholder="请输入用户名" v-model="username" clearable></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="1">密&nbsp;&nbsp;&nbsp;&nbsp;码：</el-col>
        <el-col :span="5">
          <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6" class="login-box">
          <el-button type="primary" size="mini" @click="login">登录</el-button>
          <el-button type="info" size="mini" @click="reset">取消</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from "../axios/request.js";

export default {
  data() {
    return {
      username: "sunlight",
      password: "123456"
    };
  },
  methods: {
    async login() {
      let userinfo = {
        username: this.username,
        password: this.password
      };
      axios
        .post("/api/userLogin", {
          userinfo
        })
        .then(res => {
          console.log(res);
          if (res.data.status === 409) {
            this.$message({
              message: "账号不存在",
              type: "warning"
            });
          } else {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username)
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$router.push('/home')
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    reset() {
      (this.username = ""), (this.password = "");
    }
  }
};
</script>

<style lang="stylus" scoped>
gap = 10px;

.el-container {
  height: 900px;
  background-color: #eee;

  .el-main {
    margin-top: 100px;

    .el-col {
      height: 60px;
      line-height: 60px;
      text-align: center;
    }

    .login-box {
      text-align: right;
    }
  }
}
</style>