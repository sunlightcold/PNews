<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isRouterAlive"/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  beforeCreate() {
    this.$store.dispatch("getDataAction");
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  },
  created() {
    //读取cookies，获取用户名
    let cookies = decodeURIComponent(document.cookie).split("=");
    if (cookies.length !== 0 && cookies != '') {
      this.$store.state.userNameState = cookies[1];
    }
  }
};
</script>

<style lang="stylus"></style>
