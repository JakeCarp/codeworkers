<template>
  <div class="createPost">
    <form @submit.prevent="createPost" class="card elevation-3 p-3 m-3 row">
      <div class="card-title col-md-12 p-1">
        <div class="align-items-top row">
          <span class="col-md-1 me-3 d-none d-md-flex">
            <img class="image-fluid post-img" :src="account.picture" />
          </span>
          <div class="col">
            <div class="row justify-content-between">
              <p class="col-4">{{ account.name }}</p>
              <i v-if="account.graduated" class="mid mdi-school"></i>
            </div>
          </div>
        </div>
      </div>
      <textarea
        class="card-body col"
        v-model="state.editable.body"
        name="post-body"
        id="post-body"
      ></textarea>
      <button @click="createPost">Submit</button>
    </form>
  </div>
</template>


<script>
import { computed, reactive } from "@vue/reactivity";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  setup() {
    const state = reactive({
      editable: {},
    });
    return {
      state,
      account: computed(() => AppState.account),
      async createPost() {
        try {
          await postsService.createPost(state.editable);
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