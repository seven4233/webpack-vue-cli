<template>
  <div class="goods-list">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :imageLink="item.show.img"
      :title="item.title"
      :price="item.price"
      :collection="item.cfav"
      @click.native="goodsItemClick(item)"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  props: ["goods"],
  components: {
    GoodsListItem,
  },
  methods: {
    goodsItemClick(item) {
      this.$emit("goodsItemClick", item.iid);
    },
  },
};
</script>

<style lang="less" scoped>
.goods-list {
  // width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
