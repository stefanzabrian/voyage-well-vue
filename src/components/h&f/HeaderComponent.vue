<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";
const auth = useAuthStore();

const logout = () => {
  auth.logout();
  router.push("/login");
};
</script>

<template>
  <header class="p-3 text-bg-dark">
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
          <li><a href="/" class="nav-link px-2 text-secondary">Home</a></li>
          <li v-if="auth.isAuthenticated">
            <a href="#" class="nav-link px-2 text-white">Features</a>
          </li>
          <li v-if="auth.isAuthenticated">
            <a href="#" class="nav-link px-2 text-white">FAQs</a>
          </li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li>
        </ul>
        <form
          v-if="auth.isAuthenticated"
          class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
          role="search"
        >
          <input
            type="search"
            class="form-control form-control-dark text-bg-dark"
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
          <button
            v-if="!auth.isAuthenticated"
            type="button"
            class="btn btn-warning"
          >
            Sign-up
          </button>
          <div v-if="auth.isAuthenticated" class="btn-group">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    {{ auth.user}}
  </button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li><a class="dropdown-item" href="user-settings">Settings</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><hr class="dropdown-divider" /></li>
    <li>
      <a @click="logout" href="#" class="dropdown-item">Logout</a>
    </li>
  </ul>
</div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
