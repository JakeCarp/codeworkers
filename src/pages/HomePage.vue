<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-6 p-3">
        <createPost v-if="account.id" />
        <thread />
      </div>
      <div class="col-md-3 py-3">
        <div class="row">
          <promotion class="col my-3" :promotion="promotion" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import Thread from "../components/Thread.vue";
import { onMounted, watchEffect } from "@vue/runtime-core";
import CreatePost from "../components/CreatePost.vue";
import { promotionsService } from "../services/PromotionsService";
import Promotion from "../components/Promotion.vue";
import Pop from "../utils/Pop";
export default {
  components: { Thread, CreatePost, Promotion },
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await promotionsService.getPromotions();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      promotion: computed(() => AppState.promotion),
      account: computed(() => AppState.account),
    };
  },
};
</script>

<style scoped lang="scss">
</style>
