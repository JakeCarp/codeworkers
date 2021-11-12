<template>
  <thread />
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import Thread from "../components/Thread.vue";
import { watchEffect } from "@vue/runtime-core";
export default {
  components: { Thread },
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
