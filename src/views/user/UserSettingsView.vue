<script lang="ts" setup>
import UserSettingsForm from "@/components/forms/user/UserSettingsForm.vue";
</script>

<template>
  <UserSettingsForm class="text-bg-gradient" />
</template>
<style scoped>
.text-bg-gradient {
  background-image: linear-gradient(
    to right,
    #21627cc4,
    #250333
  ); /* Change the colors here */
  color: rgb(255, 255, 255); /* Set text color to white */
}
</style>
