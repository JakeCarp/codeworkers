<template>
  <div class="thread row">
    <Post v-for="p in posts" :key="p.id" :post="p" />
  </div>
  <div class="row justify-content-between">
    <button
      v-if="prevPage !== null"
      class="btn btn-primary"
      @click="getOlderPosts"
    >
      Previous Page
    </button>
    <button v-else class="btn btn-primary" @click="getNewerPosts"></button>
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
      nextPage: computed(() => AppState.nextPage),
      prevPage: computed(() => AppState.prevPage),
      posts: computed(() => AppState.posts),
      async getOlderPosts() {
        try {
          await postsService.getAll(prevPage);
        } catch (error) {
          logger.log(error);
          Pop.toast(error.message, "error");
        }
      },
      async getNewerPosts() {
        try {
          await postsService.getAll(nextPage);
        } catch (error) {
          logger.log(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>