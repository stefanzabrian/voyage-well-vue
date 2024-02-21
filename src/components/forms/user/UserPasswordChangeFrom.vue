<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { onMounted, reactive, ref } from "vue";

const auth = useAuthStore();
const userStore = useUserStore();

// Define a reactive variable to track whether update password was attempted
const updatePasswordAttempted = ref(false);
// Define a reactive variable to track whether update password was successfully
const updateTrue = ref(false);
// Define a reactive variable to track whether the fields match
const passwordDontMatch = ref(false);

// Add a reactive variable to control form visibility
const formVisible = ref(false);
// After the component is mounted, set a timeout to trigger the slide-in animation
onMounted(() => {
  setTimeout(() => {
    formVisible.value = true;
  }, 100); // Adjust the delay time as needed
});

const user = reactive({
  newPassword: "",
  confirmPassword: "",
});

async function onSubmit() {
  if (user.newPassword != "" && user.confirmPassword != "") {
    if (user.newPassword !== user.confirmPassword) {
      passwordDontMatch.value = true;
      return; // Prevent further execution
    }
    if (user.newPassword == user.confirmPassword) {
      passwordDontMatch.value = false;
    }
    const updatePasswordSuccess = await userStore.updatePassword(
      user.newPassword,
      user.confirmPassword
    );
    if (!updatePasswordSuccess) {
      updatePasswordAttempted.value = true;
    } else {
      updatePasswordAttempted.value = false;
      updateTrue.value = true;
    }
  }
}
</script>

<template>
  <div>
    <section class="container">
      <div class="container-fluid pt-2 pb-2">
        <div class="slide-in-form" :class="{ 'slide-in': formVisible }">
          <!-- Container -->
          <div class="col-sm-12 custom-background text-white">
            <div class="justify-content-center px-5 ms-xl-4 pt-xl-5 mt-xl-n5">
              <div class="d-flex align-content-center justify-content-center">
                <!--Form-->
                <form
                  method="POST"
                  @submit.prevent="onSubmit"
                  style="width: 23rem"
                >
                  <h3 class="fw-normal mb-3 pt-2" style="letter-spacing: 1px">
                    Update password
                  </h3>

                  <!-- Alert Message -->
                  <div
                    v-if="auth.isAuthenticated && passwordDontMatch"
                    class="alert alert-light"
                    role="alert"
                  >
                    Password and Confirm Password must match!
                  </div>
                  <!-- Alert Message -->
                  <div
                    v-if="auth.isAuthenticated && updatePasswordAttempted"
                    class="alert alert-light"
                    role="alert"
                  >
                    Failed to update password, an error occurred!
                  </div>
                  <!-- Alert Message -->
                  <div
                    v-if="auth.isAuthenticated && updateTrue"
                    class="alert alert-light"
                    role="alert"
                  >
                    Your password was updated successfully!
                  </div>

                  <div
                    class="form-outline mb-4"
                    v-if="auth.isAuthenticated && !updateTrue"
                  >
                    <input
                      v-model="user.newPassword"
                      type="password"
                      id="newPassword"
                      required="true"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="newPassword"
                      >New Password</label
                    >
                  </div>

                  <div
                    class="form-outline mb-4"
                    v-if="auth.isAuthenticated && !updateTrue"
                  >
                    <input
                      v-model="user.confirmPassword"
                      type="password"
                      id="confirmPassword"
                      required="true"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="confirmPassword"
                      >Confirm Password</label
                    >
                  </div>

                  <div
                    class="pt-1 mb-4"
                    v-if="auth.isAuthenticated && !updateTrue"
                  >
                    <button class="btn btn-info btn-lg btn-block" type="submit">
                      Update
                    </button>
                  </div>
                  <div
                    class="pt-1 mb-4"
                    v-if="auth.isAuthenticated && updateTrue"
                  >
                    <a class="btn btn-info btn-lg btn-block" href="/">
                      Ok
                    </a>
                  </div>
                </form>

                <!--Image Container-->
                <div class="col-sm-6 px-5 d-none d-sm-flex mt-4 mb-4">
                  <img
                    src="@/assets/pictures/pexels-kate-kerr.jpg"
                    alt="Login image"
                    class="w-100 h-100"
                    style="object-fit: cover; object-position: center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.custom-background {
  background-image: linear-gradient(
    to right,
    #21627cc4,
    #250333
  ); /* Change the colors here */
  color: rgb(255, 255, 255); /* Set text color to white */
}
.slide-in-form {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  transform: translateX(-100%);
  opacity: 0;
}

.slide-in-form.slide-in {
  transform: translateX(0);
  opacity: 1;
}
</style>
