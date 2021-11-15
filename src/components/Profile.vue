<template>
  <div class="profile pb-2">
    <div class="card text-white row elevation-3">
      <div class="col-12">
        <div class="row card-bg p-3">
          <img
            :src="profile.picture"
            class="rounded-circle img-fluid col-2"
            alt="profile picture"
          />
          <div class="div col-4 mt-5 d-flex flex-column">
            <div>
              <p class="f-16 fw-bold mb-2 card-text">{{ profile.name }}</p>
              <p class="f-12 fw-bold card-text">{{ profile.email }}</p>
            </div>
            <div class="d-flex flex-row justify-content-between mt-2">
              <a :href="profile.linkedin">
                <i class="mdi mdi-linkedin col-4 mdi-24px"></i>
              </a>
              <a :href="profile.github">
                <i class="mdi mdi-github col-4 mdi-24px"></i>
              </a>
              <!-- FIXME adjust this to allow for document upload -->
              <a :href="profile.resume">
                <i class="mdi mdi-file-document col-4 mdi-24px"></i>
              </a>
            </div>
          </div>
          <div class="col-5 d-flex p-2 flex-column">
            <p v-if="profile.graduated" class="card-text f-16 fw-bold">
              Graduated:
            </p>
            <p v-if="profile.class" class="card-text f-16 fw-bold">
              Class of Summer 2021
            </p>
            <button
              v-if="account.id === profile.id"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
            >
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
  <editProfileModal v-if="profile" id="editModal" :profile="profile" />
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
a {
  color: white;
}
.card-bg {
  background-image: v-bind(coverImg);
}

.card-text {
  text-shadow: 1px 0 0 black, 0 1px 0 black, -1px 0 0 black, 0 -1px 0 black;
}
</style>