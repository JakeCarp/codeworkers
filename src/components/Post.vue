<template>
  <div class="post card elevation-3 p-3 m-3 row">
    <div class="card-title col-md-12 p-1">
      <div class="align-items-top row">
        <span class="col-md-1 me-3 d-none d-md-flex">
          <img
            @click="routeTo"
            class="image-fluid post-img selectable"
            :src="post.creator.picture"
          />
        </span>
        <div class="col">
          <div class="row justify-content-between">
            <p class="col-4">{{ post.creator.name }}</p>
            <button
              v-if="post.creatorId === account.id"
              class="col-1 btn btn-outline-primary"
            >
              <i class="mdi mdi-dots-horizontal"></i>
            </button>
            <i v-if="post.creator.graduated" class="mid mdi-school"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body col-9">
      <p>{{ post.body }}</p>
    </div>
    <div class="row justify-content-end">
      <div class="col-1">
        <span
          ><i
            v-if="post.likeIds.includes(account.id)"
            @click="likePost"
            class="mdi mdi-36px mdi-cards-heart selectable"
          ></i>
          <i
            v-else
            @click="likePost"
            class="mdi mdi-36px mdi-cards-heart-outline selectable"
          ></i>
          {{ post.likes.length }}</span
        >
      </div>
    </div>
  </div>
</template>


<script>
import { computed, reactive } from "@vue/reactivity";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRouter } from "vue-router";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const account = computed(() => AppState.account);
    return {
      account,
      liked: computed(() => props.post.likeIds.includes(account.id)),
      async routeTo() {
        router.push({
          name: "Profile",
          params: { id: props.post.creatorId },
        });
      },
      async likePost() {
        try {
          await postsService.likePost(props.post.id);
        } catch (error) {
          logger.error(error);
          if (!account.id) {
            Pop.toast("Please Login to like a post", "error");
          } else {
            Pop.toast(error.message, "error");
          }
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>