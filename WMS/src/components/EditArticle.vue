<template>
  <div class="edit">
    <el-container>
      <el-header>
        <el-input placeholder="请输入内容" v-model="article.title" autosize>
          <template slot="prepend">标题</template>
          <el-button slot="append" icon="el-icon-circle-check"></el-button>
        </el-input>
      </el-header>
      <el-header>
        <el-input placeholder="请输入内容" v-model="article.author" autosize>
          <template slot="prepend">作者</template>
          <el-button slot="append" icon="el-icon-circle-check"></el-button>
        </el-input>
      </el-header>
      <el-header>
        <el-input placeholder="请输入内容" v-model="article.source">
          <template slot="prepend">出处</template>
          <el-button slot="append" icon="el-icon-circle-check"></el-button>
        </el-input>
      </el-header>
      <el-header v-for="(arr, index) in article.keywords" :key="arr">
        <el-input placeholder="请输入内容" v-model="article.keywords[index]" autosize>
          <template slot="prepend">key</template>
          <el-button slot="append" icon="el-icon-circle-check"></el-button>
        </el-input>
      </el-header>
      <el-header>
        <el-input placeholder="请输入内容" v-model="article.pubtime" autosize>
          <template slot="prepend">日期</template>
          <el-button slot="append" icon="el-icon-circle-check"></el-button>
        </el-input>
      </el-header>

      <div v-for="(arr, index) in article.contentlist" :key="arr">
        <el-input
          placeholder="请输入内容"
          v-model="article.contentlist[index]"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 60}"
        >
          <template slot="prepend">contentList</template>
          <el-button slot="append" icon="el-icon-circle-check"></el-button>
        </el-input>
      </div>
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
      article: []
    };
  },
  methods: {
    findArticle() {
      this.axios
        .post("/api/findArticle", {
          _id: this.$route.params._id,
          articleType: this.$route.params.articleType
        })
        .then(res => {
          console.log(res.data);
          this.article = res.data.article;
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
          this.updateAtricle()
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

    updateAtricle() {
      this.axios
        .post("/api/updateArticle", {
          article: this.article
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