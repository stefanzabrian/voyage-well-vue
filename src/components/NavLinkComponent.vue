<template>
  <div>
    <div class="p-2 nav-scroller shadow-sm text-bg-gradient">
      <nav class="nav nav-underline justify-content-flex-start" aria-label="Secondary navigation">
        <a class="nav-link px-2 text-white" aria-current="page" href="#">Dashboard</a>
        <a class="nav-link px-2 text-white" href="#">Users</a>
        <a class="nav-link px-2 text-white" href="#">Hotels</a>
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
}</style>