<template>
  <div class="article-comment">
    <div class="plun-box">
      <div class="plun-title">发表评论</div>
      <div class="plun-content">
        <textarea class="txt" v-model="txt"></textarea>
      </div>
      <div class="btn btn-danger fa-info" v-show="txtDanger" ref="infodanger">评论内容不得少于1个字符！</div>
      <div class="btn btn-primary fa-plun" @click="sendPlun">发表评论</div>
      <div class="comment-list-wrap">
        <div class="comment-list" v-for="comment in commentList" :key="comment._id">
          <div class="user-wrap">
            <div class="floor">楼层 [ {{ comment.floor }} ]</div>
            <div class="comment-user">{{ comment.userName }}</div>
          </div>
          <div class="comment-content">{{ comment.comment }}</div>
          <div class="pubdate">发表时间：{{ comment.pubDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      txt: "",
      txtDanger: false,
      commentList: []
    };
  },
  props: ["commentInfo"], //文章id
  methods: {
    sendPlun() {
      //判断是否登录
      if (this.$store.state.userNameState !== "登录") {
        //判断内容是否为空
        if (this.txt == "") {
          this.$refs.infodanger.innerText = "评论内容不得少于1个字符！";
          this.txtDanger = true;
          this.$refs.infodanger.setAttribute("class", "btn btn-danger fa-info");
          setTimeout(() => {
            this.txtDanger = false;
          }, 1000);
        } else {
          //   console.log(this.commentInfo)
          let that = this;
          this.axios
            .post("/api/article/pinglun", {
              _id: that.commentInfo.articleId,
              articleType: that.commentInfo.articleType,
              articleComment: that.txt,
              userName: that.$store.state.userNameState
            })
            .then(function(res) {
              // console.log(res.data);
              //评论结果处理，205失败，206成功
              if (res.data.status == 205) {
                that.txtDanger = true;
                that.$refs.infodanger.innerText = "评论失败";
                that.$refs.infodanger.setAttribute(
                  "class",
                  "btn btn-danger fa-info"
                );
                setTimeout(() => {
                  that.txtDanger = false;
                }, 1000);
              } else if (res.data.status == 206) {
                that.txtDanger = true;
                that.$refs.infodanger.innerText = "评论成功";
                that.$refs.infodanger.setAttribute(
                  "class",
                  "btn btn-success fa-info"
                );
                setTimeout(() => {
                  that.txtDanger = false;
                }, 1000);
                that.getCommentList();
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      } else {
        this.txtDanger = true;
        this.$refs.infodanger.innerText = "请先登录！";
        setTimeout(() => {
          this.txtDanger = false;
        }, 1000);
      }
    },
    getCommentList() {
      let that = this;
      this.axios
        .post("/api/commentlist", {
          _id: that.commentInfo.articleId,
          articleType: that.commentInfo.articleType
        })
        .then(res => {
          // console.log(res.data);

          that.commentList = res.data.commentList;
          that.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getCommentList();
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (this.$route.name == "detail") {
        this.getCommentList();
      }
      //   console.log(this.$route);
      //   this.getCommentList();
    }
  }
};
</script>

<style lang="stylus" scoped>
.article-comment {
  margin-top: 40px;
  width: 100%;

  .plun-box {
    .plun-title {
      width: 100%;
      margin: 0 auto;
      text-align: left;
      padding: 20px 0px;
      font-size: 15px;
      font-weight: 700;
    }

    .plun-content {
      .txt {
        width: 100%;
        border: 1px solid #999;
        height: 200px;
        background-color: #eee;
        padding: 5px;
        font-size: 15px;
      }
    }

    .fa-info {
      margin: 10px 0px 30px 0px;
      float: left;
    }

    .fa-plun {
      margin: 10px 0px 30px 0px;
      float: right;
    }

    .comment-list-wrap {
      margin-top: 100px;
      width: 100%;

      .comment-list {
        width: 100%;
        margin: 20px 0px;

        .user-wrap {
          height: 30px;
          background-color: #eee;

          .floor {
            float: left;
            font-size: 15px;
            line-height: 30px;
          }

          .comment-user {
            font-size: 15px;
            font-weight: 700;
            color: #337ab7;
            padding-left: 10px;
            float: left;
            line-height: 30px;
          }
        }

        .comment-content {
          padding: 20px 10px;
          text-align: left;
          border: 1px solid #eee;
        }

        .pubdate {
          width: 100%;
          text-align: right;
          padding: 10px 5px;
        }
      }
    }
  }
}
</style>
