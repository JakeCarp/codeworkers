<template>
  <div class="search-results container-fluid">
    <div class="row justify-content-around">
      <div class="col-md-6">
        <profile-search-result v-for="p in profiles" :key="p.id" :profile="p" />
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
    <div class="row">
      <div class="col-md-6"></div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService";
import { profileService } from "../services/ProfileService";
import { logger } from "../utils/Logger";
import { onMounted } from "@vue/runtime-core";
import { promotionsService } from "../services/PromotionsService";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await promotionsService.getPromotions();
        await postsService.getAll("?query=" + route.params.text);
        await profileService.getAllProfiles("?query=" + route.params.text);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
      profiles: computed(() => AppState.profileList),
      promotions: computed(() => AppState.promotions),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>