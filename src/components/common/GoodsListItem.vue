<template>
  <div class="goods-list-item">
    <img :src="imageLink" alt="" />

    <div class="info">
      <p>{{ title }}</p>
      <span><i>￥</i>{{ price }}</span>
      <div class="collection">
        <van-icon name="star-o" color="red" size="14" />
        <div class="cfav">{{ collection }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "imageLink", "collection", "price"],
};
</script>

<style lang="less" scoped>
.goods-list-item {
  //   flex: 1;
  width: 50%;

  padding: 15px 10px 20px 10px;
  img {
    // width: 40vw;
    width: 100%;
    // height: 50vw;
    border-radius: 10px;
  }
  .info {
    position: relative;
    height: 37px;
    font-size: 12px;
    padding: 2px 0 5px 0;
    i {
      color: red;
      margin-right: 2px;

      // font-style: normal;
      font-size: 14px;
    }
    // display: inline-block;

    p {
      // position: absolute;
      display: inline-block;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    span {
      position: absolute;
      left: 20px;
      bottom: 0;
      font-style: italic;
      font-weight: 700;
    }
    .collection {
      width: 40px;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 20px;
      bottom: 0;
      .van-icon {
        font-weight: 600;
      }
      .cfav {
        margin-left: 2px;
      }
    }
  }
}
</style>
