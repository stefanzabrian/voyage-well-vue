<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "vue";

const auth = useAuthStore();

// Define a reactive variable to track whether login was attempted
const loginAttempted = ref(false);

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
    <section class="vh-100">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6 text-black">
            <div class="px-5 ms-xl-4">
              <i
                class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                style="color: #709085"
              ></i>
              <span class="h1 fw-bold mb-0">Logo</span>
            </div>

            <div
              class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5"
            >
              <form
                method="POST"
                @submit.prevent="onSubmit"
                style="width: 23rem"
              >
                <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
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

                <!-- Checkbox -->
                <div class="form-check d-flex mb-4">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example33"
                    checked
                  />
                  <label class="form-check-label" for="form2Example33">
                    Accept
                    <a href="#!" class="link-info">Terms & Conditions</a> and
                    <a href="#!" class="link-info">Privacy Policy</a>
                  </label>
                </div>

                <div class="pt-1 mb-4">
                  <button class="btn btn-info btn-lg btn-block" type="submit">
                    Login
                  </button>
                </div>

                <p class="small mb-5 pb-lg-2">
                  <a class="text-muted" href="#!">Forgot password?</a>
                </p>
                <p>
                  Don't have an account?
                  <a href="#!" class="link-info">Register here</a>
                </p>
              </form>
            </div>
          </div>
          <div class="col-sm-6 px-0 d-none d-sm-block">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
              alt="Login image"
              class="w-100 vh-100"
              style="object-fit: cover; object-position: left"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
