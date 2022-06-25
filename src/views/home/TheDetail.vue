<template>
  <div class="detail">
    <van-tabs v-model="active" offset-top="0px" sticky>
      <van-tab v-for="(item, index) in title" :title="item" :key="index">
        <!-- 详情页————商品 -->
        <detail-goods
          :itemInfo="itemInfo"
          :shopInfo="shopInfo"
          :columns="columns"
          :detailInfo="detailInfo"
        ></detail-goods>
        <!-- 详情页————参数 -->
        <detail-params :itemParams="itemParams"></detail-params>
        <!-- 详情页————评论 -->
        <detail-comment></detail-comment>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import DetailGoods from './detail/DetailGoods.vue';
import DetailParams from './detail/DetailParams.vue';
import DetailComment from './detail/DetailComment.vue';
export default {
  components: { DetailGoods, DetailParams, DetailComment },
  data() {
    return {
      active: 0,
      title: ['商品', '参数', '评论', '详情'],
    };
  },
  created() {
    this.id = this.$route.params.id;

    this.$store.dispatch('getDetail', { id: this.id });
  },
  computed: {
    itemInfo() {
      return this.$store.getters['itemInfo'];
    },
    shopInfo() {
      return this.$store.getters['shopInfo'];
    },
    columns() {
      return this.$store.getters['columns'];
    },
    detailInfo() {
      return this.$store.getters['detailInfo'];
    },
    itemParams() {
      return this.$store.getters['itemParams'];
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.detail {
}
</style>
