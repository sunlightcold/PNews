<template>
  <div class="edit">
    <el-container>
      <el-header>
        <el-input placeholder="请输入内容" v-model="userinfo.username" autosize>
          <template slot="prepend">username</template>
          <el-button slot="append" icon="el-icon-circle-check"></el-button>
        </el-input>
      </el-header>
      <el-header>
        <el-input placeholder="请输入内容" v-model="userinfo.userpwd" autosize>
          <template slot="prepend">password</template>
          <el-button slot="append" icon="el-icon-circle-check"></el-button>
        </el-input>
      </el-header>
      <el-header>
        <el-input placeholder="请输入内容" v-model="userinfo.useremail" autosize>
          <template slot="prepend">useremail</template>
          <el-button slot="append" icon="el-icon-circle-check"></el-button>
        </el-input>
      </el-header>
      <el-header>
        <el-input placeholder="请输入内容" v-model="userinfo.logindate" autosize>
          <template slot="prepend">loginTime</template>
          <el-button slot="append" icon="el-icon-circle-check"></el-button>
        </el-input>
      </el-header>
      <el-header>
        <el-button type="info" style="float: right; margin-top: 20px;" @click="reset">取消</el-button>
        <el-button
          type="primary"
          style="float: right; margin-top: 20px; margin-right: 20px;"
          @click="submit"
        >提交</el-button>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: []
    };
  },
  methods: {
    findArticle() {
      this.axios
        .post("/api/findUser", {
          _id: this.$route.params._id
        })
        .then(res => {
          console.log(res.data);
          this.userinfo = res.data.userinfo;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          console.log("加载完成");
        });
    },
    submit() {
      this.$confirm("此操作将永久覆盖该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateUser();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消覆盖"
          });
        });
    },

    reset() {
      this.$router.back(-1);
    },

    updateUser() {
      this.axios
        .post("/api/updateUser", {
          userinfo: this.userinfo
        })
        .then(res => {
          console.log(res);
          this.$message({
            type: "success",
            message: "覆盖成功!"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.findArticle();
  }
};
</script>

<style lang="stylus" scoped>
.el-input {
  width: 500px;
}
</style>