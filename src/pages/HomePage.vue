<template></template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
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
