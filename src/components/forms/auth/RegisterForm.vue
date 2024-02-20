<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { onMounted, reactive, ref } from "vue";

const auth = useAuthStore();

// Define a reactive variable to track whether login was attempted
const registerAttempted = ref(false);
const serverIssue = ref(false);
const passwordDontMatch = ref(false);
const passwordMustBe = ref(false);

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
  confirmPassword: "",
  firstName: "",
  lastName: "",
  nickName: "",
  acceptedConditions: false,
});

async function onSubmit() {
  if (
    user.email != "" &&
    user.password != "" &&
    user.confirmPassword != "" &&
    user.firstName != "" &&
    user.lastName != "" &&
    user.nickName != "" &&
    user.acceptedConditions != false
  ) {
    if (user.password !== user.confirmPassword) {
      passwordDontMatch.value = true;
      return; // Prevent further execution
    }
    if (user.password == user.confirmPassword) {
      passwordDontMatch.value = false;
    }
    const registerSuccess = await auth.register(
      user.email,
      user.password,
      user.confirmPassword,
      user.firstName,
      user.lastName,
      user.nickName,
      user.acceptedConditions
    );
    if (registerSuccess == 409) {
      registerAttempted.value = true;
    } else if (registerSuccess == 400) {
      passwordMustBe.value = true;
    } else if (registerSuccess == 500) {
      serverIssue.value = true;
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
                    Register
                  </h3>
                  <!-- Alert Message -->
                  <div
                    v-if="!auth.isAuthenticated && registerAttempted"
                    class="alert alert-light"
                    role="alert"
                  >
                    Email already exists!
                    <a class="link-info" href="/forgot-password">Forgot password?</a>
                  </div>
                  <!-- Alert Message -->
                  <div
                    v-if="!auth.isAuthenticated && serverIssue"
                    class="alert alert-light"
                    role="alert"
                  >
                    Opps an Server-Error occurred!
                  </div>
                  <!-- Alert Message -->
                  <div
                    v-if="!auth.isAuthenticated && passwordDontMatch"
                    class="alert alert-light"
                    role="alert"
                  >
                    Password and Confirm Password must match!
                  </div>
                  <!-- Alert Message -->
                  <div
                    v-if="!auth.isAuthenticated && passwordMustBe"
                    class="alert alert-light"
                    role="alert"
                  >
                    Password must be between 4 to 15 characters!
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      v-model="user.email"
                      type="email"
                      id="email"
                      autocomplete="username"
                      required="true"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="email">Email address</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      v-model="user.password"
                      type="password"
                      id="password"
                      required="true"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="password">Password</label>
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      v-model="user.confirmPassword"
                      type="password"
                      id="confirm-password"
                      required="true"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="confirm-password"
                      >Confirm Password</label
                    >
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      v-model="user.firstName"
                      type="text"
                      id="first-name"
                      autocomplete="first-name"
                      required="true"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="first-name">First Name</label>
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      v-model="user.lastName"
                      type="text"
                      id="last-name"
                      autocomplete="last-name"
                      required="true"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="last-name">Last Name</label>
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      v-model="user.nickName"
                      type="text"
                      id="nick-name"
                      autocomplete="nick-name"
                      required="true"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="nick-name">Nick Name</label>
                  </div>

                  <!-- Checkbox -->
                  <div class="form-check d-flex mb-2">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      v-model="user.acceptedConditions"
                      id="form2Example33"
                      not-checked
                      required="true"
                    />
                    <label class="form-check-label" for="form2Example33">
                      Accept
                      <a href="#!" class="link-info">Terms & Conditions</a> and
                      <a href="#!" class="link-info">Privacy Policy</a>
                    </label>
                  </div>

                  <div class="pt-1 mb-2">
                    <button class="btn btn-info btn-lg btn-block" type="submit">
                      Register
                    </button>
                  </div>
                  <p class="small mb-1 pb-lg-2">
                    <a class="link-info" href="/forgot-password">Forgot password?</a>
                  </p>
                  <p>
                    Already a member?
                    <a href="/login" class="link-info">Login here</a>
                  </p>
                </form>
                <!--Image Container-->
                <div class="col-sm-6 px-5 d-none d-sm-flex mt-4 mb-4">
                  <img
                    src="@/assets/pictures/yogie-pratama.jpg"
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
  transform: translateX(100%);
  opacity: 0;
}

.slide-in-form.slide-in {
  transform: translateX(0);
  opacity: 1;
}
</style>
