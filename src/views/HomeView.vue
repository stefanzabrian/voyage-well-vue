<script setup lang="ts"></script>

<template>
  <div class="card-container">
    <div class="card">
      <div class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
        <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" class="img-fluid"/>
    </div>
    <div class="carousel-item">
      <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" class="img-fluid"/>
    </div>
    <div class="carousel-item">
      <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" class="img-fluid"/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        
        <a href="#!">
          <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
        </a>
      </div>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#!" class="btn btn-primary" data-mdb-ripple-init>Button</a>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust the height as needed */
}

.card {
  margin: 20px; /* Adjust the margin between cards */
  width: 300px; /* Adjust the width of each card */
}

.bg-image {
  position: relative;
  overflow: hidden;
}

.bg-image img {
  width: 100%;
  height: auto;
}

.card-body {
  background-color: #fff; /* Adjust background color if needed */
  padding: 20px;
}
</style>
