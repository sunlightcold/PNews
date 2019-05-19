<template>
  <div class="userinfo">
    <el-table :data="userinfo">
      <el-table-column prop="_id" label="_id"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="useremail" label="邮箱"></el-table-column>
      <el-table-column prop="userpwd" label="密码"></el-table-column>
      <el-table-column prop="logindate" label="注册时间"></el-table-column>
      <el-table-column label="操作">
         <template slot-scope="scope">
          <el-button size="mini">
              <router-link :to="{path: '/home/edituser/' + scope.row._id}" tag="div">编辑</router-link>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteArticle(scope.row._id, scope.row.articleType)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    getUserData() {
      this.axios
        .get("/api/userinfo")
        .then(res => {
          this.userinfo = res.data.data;
          console.log(this.userinfo);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          console.log("加载完成");
        });
    }
  },
  created() {
      this.getUserData()
  }
};
</script>

<style lang="scss" scoped>
</style>