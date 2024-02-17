<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "./components/h&f/HeaderComponent.vue";
</script>

<template>
  <div>
    <HeaderComponent />
    <main>
      <RouterView />
    </main>
  </div>
</template>
