<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div>
    <div class="p-2 nav-scroller shadow-sm text-bg-gradient">
      <nav
        class="nav nav-underline justify-content-flex-start"
        aria-label="Secondary navigation"
      >
        <a class="nav-link px-2 text-white" aria-current="page" href="#"
          >Dashboard</a
        >
        <a class="nav-link px-2 text-white" href="#">Users</a>
        <div class="dropdown">
          <a class="nav-link px-2 text-white" href="#" data-bs-toggle="dropdown">
            Hotels</a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link class="dropdown-item" to="/hotel-add"
                  >Add</router-link
                >
              </li>
              <li><a class="dropdown-item" href="#">All</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a href="#" class="dropdown-item">Action</a>
              </li>
            </ul>
          
        </div>
        <a class="nav-link px-2 text-white" href="#">Rooms</a>
        <a class="nav-link px-2 text-white" href="#">Link</a>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.text-bg-gradient {
  background-image: linear-gradient(
    to right,
    #21627cda,
    #250333
  ); /* Change the colors here */
  color: rgb(255, 255, 255); /* Set text color to white */
  position: relative;
}
.nav-link {
  cursor: pointer; /* Ensure that the cursor changes to pointer on hover */
  /* Add any other necessary CSS properties */
}
</style>
