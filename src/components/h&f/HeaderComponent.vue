<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { RouterLink } from "vue-router";
const auth = useAuthStore();
const showNavLinks = ref(false);
function toggleNavLinks() {
  showNavLinks.value = !showNavLinks.value;
}

const logout = () => {
  auth.logout();
  router.push("/login");
};
</script>

<template>
  <header class="p-3 text-bg-gradient">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <a
          href="/"
          class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
        >
          <svg
            class="bi me-2"
            width="40"
            height="32"
            role="img"
            aria-label="Bootstrap"
          >
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a>

        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li><a href="/" class="nav-link px-2 text-white">Home</a></li>
          <li v-if="auth.isAuthenticated && !showNavLinks">
            <a href="#" class="nav-link px-2 text-white">Features</a>
          </li>
          <li v-if="!showNavLinks">
            <a href="#" class="nav-link px-2 text-white" @click="toggleNavLinks"
              >More</a
            >
          </li>
          <template v-if="showNavLinks">
            <li v-if="auth.isAuthenticated">
              <a
                href="#"
                class="nav-link px-2 text-white"
                @click="toggleNavLinks"
                >Features</a
              >
            </li>
            <li v-if="auth.isAuthenticated">
              <a
                href="#"
                class="nav-link px-2 text-white"
                @click="toggleNavLinks"
                >FAQs</a
              >
            </li>
            <li>
              <a
                href="#"
                class="nav-link px-2 text-white"
                @click="toggleNavLinks"
                >About</a
              >
            </li>
          </template>
        </ul>
        <form
          v-if="auth.isAuthenticated"
          class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
          role="search"
        >
          <input
            type="search"
            class="form-control form-control-dark text-white"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        <div class="text-end">
          <RouterLink
            v-if="!auth.isAuthenticated"
            to="/login"
            type="button"
            class="btn btn-outline-light me-2"
            >Login</RouterLink
          >
          <RouterLink
            v-if="!auth.isAuthenticated"
            to="/register"
            type="button"
            class="btn btn-warning"
          >
            Sign-up
          </RouterLink>
          <RouterLink v-if="auth.isAuthenticated" to="#" class="btn-group">
            <!-- New div for nickname -->
            <div class="nickname">
              <span class="nickname-text font-monospace">{{ auth.nickName }}</span>
            </div>
            <!-- Avatar div -->
            <div
              class="avatar rounded-circle overflow-hidden border border-light dropdown-toggle"
              style="width: 44px; height: 44px"
              data-bs-toggle="dropdown"
            >
            <template v-if="auth.avatarUrl">
              <img
                :src="auth.avatarUrl"
                alt="User Avatar"
                style="width: 100%; height: 100%; object-fit: cover"
              />
            </template>
            <template v-else>
              <div class="default-avatar" style="width: 100%; height: 100%; background-color: #5e5a5a; border-radius: 50%;"></div>
            </template>
            </div>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <RouterLink class="dropdown-item" to="user-settings"
                  >Settings</RouterLink
                >
              </li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a @click="logout" href="#" class="dropdown-item">Logout</a>
              </li>
            </ul>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.text-bg-gradient {
  background-image: linear-gradient(
    to right,
    #21627cda,
    #250333
  ); /* Change the colors here */
  color: rgb(255, 255, 255); /* Set text color to white */
}
.nickname {
  display: flex;
  align-items: center;
  padding-right: 10px; /* Adjust spacing as needed */
  font-weight: medium;
  color: #1dd7f0; /* Adjust color as needed */
}

/* Styling for the nickname text */
.nickname-text {
  margin-right: 5px; /* Adjust spacing as needed */
}
</style>
