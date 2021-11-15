<template>
  <div class="searchProfile">
    <div @click="routeTo" class="selectable card elevation-3 col">
      <div class="row">
        <div class="col-12 d-flex">
          <img
            :src="profile.picture"
            alt="profile picture"
            class="img-fluid result-img"
          />
          <p>{{ profile.name }}</p>
          <i v-if="profile.graduated" class="mdi mdi-school"></i>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useRouter } from "vue-router";
export default {
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    return {
      async routeTo() {
        router.push({
          name: "Profile",
          params: { id: props.profile._id },
        });
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.result-img {
  height: 100px;
  width: 100px;
}
</style>