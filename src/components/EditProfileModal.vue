<template>
  <div class="modal" tabindex="-1" id="editModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Profile</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3 d-flex justify-content-between">
              <div>
                <label for="alias" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="alias"
                  id="alias"
                  aria-describedby="alias"
                  v-model="editable.name"
                />
              </div>
              <div>
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="email"
                  aria-describedby="email"
                  v-model="editable.email"
                />
              </div>
              <div>
                <label for="class" class="form-label">Class</label>
                <input
                  type="text"
                  class="form-control"
                  name="class"
                  id="class"
                  aria-describedby="class"
                  placeholder="Class..."
                  v-model="editable.class"
                />
              </div>
            </div>
            <div class="mb-3 d-flex justify-content-between">
              <div>
                <label for="graduated" class="form-label">Graduated?</label>
                <input
                  type="checkbox"
                  class="form-control check"
                  name="graduated"
                  id="graduated"
                  aria-describedby="graduated"
                  v-model="editable.graduated"
                />
              </div>
              <div>
                <label for="linkedin" class="form-label">LinkedIn</label>
                <input
                  type="text"
                  class="form-control"
                  name="linkedin"
                  id="linkedin"
                  aria-describedby="linkedin"
                  placeholder="linkedin..."
                  v-model="editable.linkedin"
                />
              </div>
              <div>
                <label for="github" class="form-label">Github</label>
                <input
                  type="text"
                  class="form-control"
                  name="github"
                  id="github"
                  aria-describedby="github"
                  placeholder="github..."
                  v-model="editable.github"
                />
              </div>
              <!-- FIXME need to add form field to support document upload -->
            </div>
            <div class="mb-3">
              <div>
                <label for="profileUrl" class="form-label">Profile Url</label>
                <input
                  type="url"
                  class="form-control"
                  name="profileUrl"
                  id="profileUrl"
                  aria-describedby="profileUrl"
                  placeholder="Image Url..."
                  v-model="editable.picture"
                />
              </div>
              <div>
                <label for="coverUrl" class="form-label">Cover Url</label>
                <input
                  type="url"
                  class="form-control"
                  name="coverUrl"
                  id="coverUrl"
                  aria-describedby="coverUrl"
                  placeholder="Image Url..."
                  v-model="editable.coverImg"
                />
              </div>
            </div>
            <div class="mb-3">
              <div>
                <label for="bio" class="form-label">Bio</label>
                <textarea
                  type="text"
                  class="form-control"
                  name="bio"
                  id="bio"
                  aria-describedby="bio"
                  placeholder="Tell us about you..."
                  min="5"
                  max="250"
                  v-model="editable.bio"
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { profileService } from "../services/ProfileService";
import Pop from "../utils/Pop";
import { watchEffect } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import { Modal } from "bootstrap";
export default {
  props: {
    profile: {
      type: Object,
    },
  },
  setup(props) {
    const editable = ref({});

    watchEffect(() => {
      editable.value = { ...props.profile };
    });

    return {
      editable,
      async handleSubmit() {
        try {
          await profileService.updateProfile(editable.value);
          Modal.getOrCreateInstance(
            document.getElementById("editModal")
          ).hide();
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
.check {
  width: 5px;
}
</style>