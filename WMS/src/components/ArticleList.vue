<template>
  <div class="userinfo">
    <el-table :data="articlelist">
      <el-table-column prop="_id" label="_id" width="220px"></el-table-column>
      <el-table-column prop="title" label="title" width="400px"></el-table-column>
      <el-table-column prop="author" label="author"></el-table-column>
      <el-table-column prop="source" label="source"></el-table-column>
      <el-table-column prop="articleType" label="articleType"></el-table-column>
      <el-table-column prop="pubtime" label="pubtime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editArticle(scope.row._id, scope.row.articleType)">
              <router-link :to="{path: '/home/editarticle/' + scope.row.articleType + '/' + scope.row._id}" tag="div">编辑</router-link>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteArticle(scope.row._id, scope.row.articleType)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-footer>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        background
        layout="total, prev, pager, next, jumper"
        :total="totalPage"
      ></el-pagination>
    </el-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articlelist: [],
      query: {
        pageSize: 10,
        currentPage: 1,
        sort: "desc",
        articleType: "news"
      },
      currentPage1: 1,
      totalPage: 1,
      article: []
    };
  },
  methods: {
    getArticleList() {
      this.query.articleType = this.$route.params.articletype;
      this.axios
        .post("/api/articlelist", {
          query: this.query
        })
        .then(res => {
          console.log(res.data);
          this.totalPage = res.data.totalPage;
          this.articlelist = res.data.articleList;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          console.log("加载完成");
        });
    },
    handleCurrentChange(val) {
      this.query.currentPage = val;
      console.log(`当前页: ${val}`);
      this.getArticleList();
    },
    deleteArticle(_id, articleType) {
      // console.log(_id + articleType);
      this.axios
        .post("/api/delectarticle", {
          _id,
          articleType
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status == 402) {
            this.$message({
              message: "删除成功",
              type: "info"
            });
            this.getArticleList();
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          console.log("加载完成");
        });
    },
    editArticle(_id, articleType) {
      this.axios
        .post("/api/findArticle", {
          _id,
          articleType
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          console.log("加载完成");
        });
    }
  },
  mounted() {
    this.getArticleList();
    console.log(this.$route);
    //   console.log(this.$route)
    //   this.$store.commmit('setArticleType', )
    console.log(this.$route.params);
  },
  watch: {
    $route() {
      this.getArticleList();
      this.query.articletype = this.$route.params.articletype;
      //   alert(this.query.articleType);
    }
  }
};
</script>
