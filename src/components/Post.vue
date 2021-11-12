<template>
  <div class="post card elevation-3 p-3 m-3 row">
    <div class="card-title border-bottom col-12 p-1">
      <div class="align-items-top row">
        <img
          class="image-fluid rounded-pill post-img col-2"
          :src="post.creator.picture"
        />
        <div class="col">
          <h3>{{ post.creator.name }}</h3>
          <i v-if="post.creator.graduated" class="mid mdi-code-braces"></i>
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
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async likePost() {
        try {
          await postsService.likePost(props.post.id);
          await postsService.getAll("");
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
.postImg {
  max-height: 75px;
}
</style>