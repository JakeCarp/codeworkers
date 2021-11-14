<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
    <thread :posts="posts" />
  </div>
</template>

<script>
import { computed, onMounted, reactive, watchEffect } from "vue";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { profileService } from "../services/ProfileService";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  name: "Account",
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await postsService.getAll("?creatorId=" + route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    watchEffect(async () => {
      if (route.name == "Profile") {
        await profileService.getProfilebyId(route.params.id);
      }
    });
    return {
      route,
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
