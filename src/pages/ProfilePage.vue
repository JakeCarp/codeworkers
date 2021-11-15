<template>
  <div class="profile container-fluid">
    <div class="row">
      <profile :profile="profile" />
    </div>
    <div class="row justify-content-around">
      <div class="col-md-6">
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
import { computed, onMounted, reactive, watchEffect } from "vue";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { profileService } from "../services/ProfileService";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import Profile from "../components/Profile.vue";
import { promotionsService } from "../services/PromotionsService";
export default {
  components: { Profile },
  name: "Account",
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await promotionsService.getPromotions();
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
      promotions: computed(() => AppState.promotions),
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
