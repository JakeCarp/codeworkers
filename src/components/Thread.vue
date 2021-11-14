<template>
  <div class="thread row">
    <Post v-for="p in posts" :key="p.id" :post="p" />
  </div>
</template>

s
<script>
import { computed } from "@vue/reactivity";
import Post from "./Post.vue";
export default {
  components: { Post },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    return {
      posts: computed(() => props.posts),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>