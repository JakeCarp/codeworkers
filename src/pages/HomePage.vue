<template>
  <div class="container-fluid">
    <div class="row">
      <search />
    </div>
    <div class="row justify-content-around">
      <div class="col-md-6">
        <createPost v-if="account.id" />
        <thread :posts="posts" />
      </div>
      <div class="col-md-3">
        <div class="row justify-content-between">
          <promotion
            v-for="p in promotions"
            :key="p.title"
            class="col-12 my-5"
            :promotion="p"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { promotionsService } from "../services/PromotionsService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAll("");
        await promotionsService.getPromotions();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      promotions: computed(() => AppState.promotions),
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
    };
  },
};
</script>

<style scoped lang="scss">
</style>
