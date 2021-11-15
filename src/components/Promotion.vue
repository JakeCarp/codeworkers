<template>
  <div class="promotion">
    <a href="https://boisecodeworks.com">
      <img
        class="img-fluid"
        :src="promotion.imgUrl"
        :aria-describedby="promotion.title"
      />
    </a>
  </div>
</template>


<script>
export default {
  props: {
    promotion: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>