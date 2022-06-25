<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar
      route
      v-model="active"
      placeholder
      active-color="#ee0a24"
      inactive-color="#000"
    >
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/shopcart">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  created() {
    this.$store.dispatch('getHomeData');
  },
  components: {},
};
</script>

<style></style>
