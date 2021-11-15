<template>
  <div class="thread row">
    <Post v-for="p in posts" :key="p.id" :post="p" />
    <div class="col-12 d-flex justify-content-end">
      <button
        v-if="newer"
        @click="getPosts(newer)"
        class="btn btn-primary mx-2"
      >
        Newer
      </button>
      <button
        v-if="older"
        @click="getPosts(older)"
        class="btn btn-primary mx-2"
      >
        Older
      </button>
    </div>
  </div>
</template>

s
<script>
import { computed } from "@vue/reactivity";
import Post from "./Post.vue";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import Pop from "../utils/Pop";
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
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
      async getPosts(query) {
        try {
          await postsService.getPostsByAge(query);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>