<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-6 p-3">
        <createPost v-if="account.id" />
        <thread />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import Thread from "../components/Thread.vue";
import { watchEffect } from "@vue/runtime-core";
import CreatePost from "../components/CreatePost.vue";
export default {
  components: { Thread, CreatePost },
  name: "Home",
  setup() {
    return {
      account: computed(() => AppState.account),
    };
  },
};
</script>

<style scoped lang="scss">
</style>
