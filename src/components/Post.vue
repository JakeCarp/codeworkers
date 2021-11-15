<template>
  <div class="post card elevation-3 row my-3 p-0">
    <div class="card-title col-md-12">
      <div class="align-items-top row">
        <div class="col-md-3">
          <div class="div p-2">
            <img
              @click="routeTo"
              class="img-fluid post-img selectable"
              :src="post.creator.picture"
            />
          </div>
        </div>
        <div class="col">
          <div class="row justify-content-between">
            <div class="p-3">
              <div class="col-4">
                <p>{{ post.creator.name }}</p>
                <!-- TODO Still need to render how long ago this was posted -->
              </div>
              <!-- TODO turn this delete button into a context menu that includes edit -->
              <button
                v-if="post.creatorId === account.id"
                class="btn btn-outline-danger"
              >
                <i class="mdi mdi-trash-can" @click="removePost"></i>
              </button>
              <i v-if="post.creator.graduated" class="mdi mdi-school"></i>
            </div>
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
      // TODO refactor the Hell out of this, its slow af
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
      // FIXME Bug here prevents makeing a post after already submitting one
      async removePost() {
        try {
          if (await Pop.confirm("Delete This Post?")) {
            await postsService.removePost(props.post.id);
          }
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