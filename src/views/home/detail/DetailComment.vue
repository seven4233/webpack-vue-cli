<template>
  <div class="comment">
    <p>用户评价</p>
    <div class="comment-item"></div>
  </div>
</template>

<script>
export default {
  computed: {
    rate() {
      return this.$store.getters['rate'];
    },
  },
};
</script>

<style></style>
