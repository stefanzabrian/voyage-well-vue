<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "./components/h&f/HeaderComponent.vue";
import NavLinkComponent from "./components/NavLinkComponent.vue";
import { useAuthStore } from "./stores/auth";
import FooterComponent from "./components/h&f/FooterComponent.vue";


const auth = useAuthStore();
</script>

<template>
  <div class="app-background">
    <HeaderComponent />
    <div v-if="auth.isAuthenticated">
    <NavLinkComponent/>
  </div>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
  <div>
    <FooterComponent/>
  </div>
</template>

<style scoped>
.app-background {
  position: relative;
  background-image: url("./assets/pictures/jason-steffan.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.main-content {
  min-height: calc(100vh - 100px); /* Adjust 100px according to your footer height */
}
</style>