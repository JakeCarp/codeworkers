<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
</template>

<script>
import { computed, reactive, watchEffect } from "vue";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { profileService } from "../services/ProfileService";
export default {
  name: "Account",
  setup() {
    const route = useRoute;
    watchEffect(async () => {
      if (route.name == "Profile") {
        await profileService.getProfilebyId(route.params.id);
        await profileService.getPostsByProfile(route.params.id);
      }
    });
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
