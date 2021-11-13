<template>
  <div class="promotion">
    <img
      class="image-fluid"
      :src="promotion.tall"
      :aria-describedby="promotion.title"
    />
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