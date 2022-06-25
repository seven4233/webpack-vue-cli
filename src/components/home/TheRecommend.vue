<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item.image">
      <a :href="item.link">
        <div class="img"><img :src="item.image" alt="" /></div>
        <span>{{ item.title }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheRecommend",
  props: ["recommend"],
};
</script>

<style lang="less" scoped>
.recommend {
  width: 100%;
  height: 11.25rem;
  padding: 0.9375rem 0;
  display: flex;
  justify-content: space-around;
  //   align-items: center;
  border-bottom: 10px solid #eee;
  .img {
    width: 5rem;
    height: 5rem;
    margin-top: 0.625rem;
    // background-color: pink;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  span {
    display: block;
    text-align: center;
    margin-top: 0.625rem;
    font-size: 0.875rem;
  }
}
</style>
