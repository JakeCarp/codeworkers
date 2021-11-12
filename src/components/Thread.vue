<template>
  <div class="thread">
    <Post v-for="p in posts" :key="p.id" :post="p" />
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import Post from "./Post.vue";
import { AppState } from "../AppState";
import { onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
export default {
  components: { Post },
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAll("");
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>