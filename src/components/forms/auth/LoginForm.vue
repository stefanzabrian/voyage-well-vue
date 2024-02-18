<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { onMounted, reactive, ref } from "vue";

const auth = useAuthStore();

// Define a reactive variable to track whether login was attempted
const loginAttempted = ref(false);

// Add a reactive variable to control form visibility
const formVisible = ref(false);
// After the component is mounted, set a timeout to trigger the slide-in animation
onMounted(() => {
  setTimeout(() => {
    formVisible.value = true;
  }, 100); // Adjust the delay time as needed
});

const user = reactive({
  email: "",
  password: "",
});

async function onSubmit() {
  if (user.email != "" && user.password != "") {
    const loginSuccess = await useAuthStore().login(user.email, user.password);
    if (!loginSuccess) {
      loginAttempted.value = true;
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
          <div class="col-sm-12 custom-background text-white"
          >
            <div class="justify-content-center px-5 ms-xl-4 pt-xl-5 mt-xl-n5">
              <div class="d-flex align-content-center justify-content-center">
                <!--Form-->
                <form
                  method="POST"
                  @submit.prevent="onSubmit"
                  style="width: 23rem"
                >
                  <h3 class="fw-normal mb-3 pt-2" style="letter-spacing: 1px">
                    Log in
                  </h3>

                  <!-- Alert Message -->
                  <div
                    v-if="!auth.isAuthenticated && loginAttempted"
                    class="alert alert-light"
                    role="alert"
                  >
                    Invalid credentials!
                    <a class="link-info" href="#!">Forgot password?</a>
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      v-model="user.email"
                      type="email"
                      id="email"
                      autocomplete="username"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="email">Email address</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      v-model="user.password"
                      type="password"
                      id="password"
                      autocomplete="current-password"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="password">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-info btn-lg btn-block" type="submit">
                      Login
                    </button>
                  </div>

                  <p class="small mb-2 pb-lg-2">
                    <a class="link-info" href="#!">Forgot password?</a>
                  </p>
                  <p>
                    Don't have an account?
                    <a href="/register" class="link-info">Register here</a>
                  </p>
                </form>
              
            
            <!--Image Container-->
            <div class="col-sm-6 px-5 d-none d-sm-flex mt-4 mb-4">
              <img
                src="@/assets/pictures/fineas-anton.jpg"
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
