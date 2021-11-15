<template>
  <div class="search row px-5 my-3">
    <div class="col-12">
      <form @submit.prevent="search" class="input-group">
        <input
          v-model="searchText"
          class="form-control elevation-3"
          placeholder="What are you looking for?"
          type="text"
          name=""
          id=""
        />
        <button class="btn btn-outline-primary elevation-3">search</button>
      </form>
    </div>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { postsService } from "../services/PostsService";
import { profileService } from "../services/ProfileService";
import Pop from "../utils/Pop";
export default {
  setup() {
    const searchText = ref("");
    const router = useRouter();
    return {
      searchText,
      async search() {
        try {
          await postsService.getAll("?query=" + searchText);
          await profileService.getAllProfiles("?query=" + searchText);
          router.push({
            name: "SearchResults",
          });
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>