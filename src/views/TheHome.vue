<template>
  <div class="home">
    <div v-if="$route.params.id"><router-view></router-view></div>

    <div v-else>
      <!-- 导航栏 -->
      <van-nav-bar title="购物街" left-text="返回" left-arrow fixed placeholder>
        <template #right>
          <van-icon name="search" size="24" />
        </template>
      </van-nav-bar>

      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          ref="list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="300"
          :immediate-check="immediate"
        >
          <!-- 通知栏 -->
          <van-notice-bar
            left-icon="volume-o"
            scrollable
            mode="closeable"
            text="听说李亨最近又赚了一个亿！"
          />
          <!-- 轮播图 -->
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="image in banners" :key="image.image">
              <img :src="image.image" alt="" />
            </van-swipe-item>
          </van-swipe>

          <!-- 今日推荐 -->
          <the-recommend :recommend="recommends"></the-recommend>
          <the-popular></the-popular>

          <van-tabs v-model="active" sticky offset-top="40px" @click="tabClick">
            <van-tab v-for="(item, index) in title" :title="item" :key="index">
              <!-- goodslist -->
              <goods-list
                :goods="showGoods"
                @goodsItemClick="goodsItemClick"
              ></goods-list>
            </van-tab>
          </van-tabs>
        </van-list>
      </van-pull-refresh>
      <back-top v-show="showBackTop" @click.native="topClick"></back-top>
    </div>
  </div>
</template>

<script>
import { getHomeGoods } from '@/api/home';
import TheRecommend from '@/components/home/TheRecommend.vue';
import ThePopular from '@/components/home/ThePopular.vue';
import GoodsList from '@/components/common/GoodsList.vue';
import BackTop from '@/components/common/BackTop.vue';
export default {
  name: 'TheHome',
  components: {
    TheRecommend,
    ThePopular,
    GoodsList,
    BackTop,
  },

  data() {
    return {
      active: 0,
      total: 0,
      loading: false,
      immediate: false,
      finished: false,
      refreshing: false,
      title: ['流行', '新款', '精选'],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
      showBackTop: false,
    };
  },
  created() {
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
    window.addEventListener('scroll', this.BackTop);
  },
  computed: {
    banners() {
      return this.$store.getters['banners'];
    },
    recommends() {
      return this.$store.getters['recommends'];
    },

    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    onLoad() {
      this.getHomeGoods(this.currentType);
    },
    // this.finished = true;

    onRefresh() {
      // 清空列表数据
      this.goods[this.currentType].list = [];
      this.finished = false;
      this.loading = true;
      this.onLoad();
      setTimeout(() => {
        this.$toast('刷新成功');
        this.refreshing = false;
      }, 1000);
    },
    tabClick(index) {
      if (index === 1) {
        this.currentType = 'new';
      } else if (index === 2) {
        this.currentType = 'sell';
      } else {
        this.currentType = 'pop';
      }
    },
    BackTop() {
      if (window.scrollY >= 1000) {
        this.showBackTop = true;
      } else {
        this.showBackTop = false;
      }
    },
    topClick() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    goodsItemClick(id) {
      this.$router.push(`home/detail/${id}`);
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res.data.data.list);
        let list = res.data.data.list;
        this.loading = false;
        this.total = res.data.data.total;
        // console.log(this.total);
        if (list === null || list.length === 0) {
          this.finished = true;
          return;
        }
        this.goods[type].list = this.goods[type].list.concat(list);
        if (this.goods[type].list.length >= 60) {
          this.finished = true;
        }
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
