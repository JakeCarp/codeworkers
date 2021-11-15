<template>
  <div class="profile py-2">
    <div class="card text-white row elevation-3">
      <div class="col-12">
        <div class="row card-bg">
          <img
            :src="profile.picture"
            class="rounded-circle img-fluid col-2"
            alt="profile picture"
          />
          <div class="div col-4 mt-5">
            <p class="f-16 fw-bold mb-2 card-text">{{ profile.name }}</p>
            <p class="f-12 fw-bold card-text">{{ profile.email }}</p>
            <div class="div row">
              <i class="mdi mdi-linkedin col-4 mdi-24px"></i>
              <i class="mdi mdi-github col-4 mdi-24px"></i>
              <i class="mdi mdi-file-document col-4 mdi-24px"></i>
            </div>
          </div>
          <div class="col-5 d-flex p-2 flex-column">
            <p v-if="profile.graduated" class="card-text f-16 fw-bold">
              Graduated:
            </p>
            <p v-if="profile.class" class="card-text f-16 fw-bold">
              Class of Summer 2021
            </p>
            <button v-if="account.id === profile.id" class="btn btn-primary">
              Edit
            </button>
          </div>
        </div>
        <div class="row text-black">
          <div class="p-2">
            <h4>About me:</h4>
            <p>
              {{ profile.bio }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      coverImg: computed(() => `url(${props.profile.coverImg})`),
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
.card-bg {
  background-image: v-bind(coverImg);
}

.card-text {
  text-shadow: 1px 0 0 black, 0 1px 0 black, -1px 0 0 black, 0 -1px 0 black;
}
</style>