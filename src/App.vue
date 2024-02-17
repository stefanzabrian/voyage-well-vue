<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "./components/h&f/HeaderComponent.vue";
import NavLinkComponent from "./components/NavLinkComponent.vue";
import { useAuthStore } from "./stores/auth";

const auth = useAuthStore();
</script>

<template>
  <div>
    <HeaderComponent />
    <div v-if="auth.isAuthenticated">
    <NavLinkComponent/>
  </div>
    <main>
      <RouterView />
    </main>
  </div>
</template>
