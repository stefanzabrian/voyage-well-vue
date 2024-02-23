<template>
  <div class="container-sm">
    <header>
      <!-- Background image -->
      <div
        class="p-5 text-center bg-image"
        style="
          background-image: url('https://www.libertytravel.com/sites/default/files/styles/full_size/public/LIB1411_BrandRefresh_CorporateImages_HomepageHero_1920x680_01.jpg?itok=3GNeTTjO');
          height: 20%;
        "
      >
        <div>
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="header">
              <h1 class="mb-3 h">Hotels and Places to Stay</h1>
              <h4 class="mb-3 h">Search names to find the best hotels</h4>
              <div class="items-div">
                <form
                  class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                  role="search"
                >
                  <input
                    type="search"
                    class="form-control form-control-dark text-black search"
                    placeholder="Search..."
                    aria-label="Search"
                  />
                </form>
                <a
                  class="btn btn-outline-light btn-lg button"
                  href="#!"
                  role="button"
                  >Call to action</a
                >
                <a
                  class="btn btn-outline-light btn-lg button"
                  href="#!"
                  role="button"
                  >Call to action</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Background image -->
    </header>
    <div class="container">
      <div v-if="hotels && hotels.length" class="card-container">
        <div class="card" v-for="hotel in hotels" :key="hotel.id">
          <div
            :id="'carouselExampleFade_' + hotel.id"
            class="carousel slide carousel-fade"
          >
            <div class="carousel-inner">
              <div
                class="carousel-item"
                v-for="(image, index) in hotelImages(hotel)"
                :key="index"
                :class="{ active: index === 0 }"
              >
                <img :src="image" class="d-block w-100" alt="..." />
                <button
                  class="carousel-control-prev"
                  type="button"
                  :data-bs-target="'#carouselExampleFade_' + hotel.id"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  :data-bs-target="'#carouselExampleFade_' + hotel.id"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <!--Body-->
          <div class="card-body">
            <h5 class="card-title">{{ hotel.name }}</h5>
            <p class="card-text">
              {{ hotel.description }}
            </p>
            <a href="#!" class="btn btn-primary" data-mdb-ripple-init>Button</a>
          </div>
        </div>
      </div>
      <div v-else class="card-container">No hotels...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHotelStore } from "@/stores/hotel";
import { onMounted, ref } from "vue";

const hotels = ref();

const hotelStore = useHotelStore();
onMounted(async () => {
  hotels.value = await hotelStore.loadHotels();
  console.log("Hotels:", hotels.value); // Log the value of hotels
});

const hotelImages = (hotel: { [key: string]: any }) => {
  const images = [];
  for (let i = 1; i <= 5; i++) {
    const picture = hotel[`picture${i}`];
    if (picture && typeof picture === "string") {
      // Check if picture is a valid string
      images.push(picture);
    }
  }
  console.log("Hotel Images:", images); // Log the images for the hotel
  return images;
};
</script>
<style scoped>
.card-body {
  background-color: #fff;
  padding: 20px;
}

/* Media query for phone view */
@media (max-width: 767px) {
  .card-body {
    display: none; /* Hide cards in phone view */
  }
}
.button {
  box-shadow: 0px 0px 10px rgb(255, 255, 255);
  padding: 10px 20px;
  padding: 5px;
  margin-left: 10px;
}
.items-div {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}
.h {
  color: rgb(255, 255, 255);
  text-shadow: 0px 0px 10px rgba(0, 247, 255, 0.61);
  margin-left: 10px;
  margin-right: 10px;
}
.search {
  transition: box-shadow 0.3s;
  padding: 10px;
  height: 40px;
}
.search:hover {
  box-shadow: 0px 0px 10px rgb(250, 250, 250); /* Apply box-shadow when hovering */
}
.header {
  box-shadow: 0px 0px 10px rgb(0, 0, 0);
  background-color: #9138059c;
  transition: box-shadow 0.3s;
  width: 80%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
}
.header:hover {
  box-shadow: 0px 0px 10px rgb(250, 250, 250); /* Apply box-shadow when hovering */
}

.container {
  max-width: 1200px;
  margin-top: 0%;
  background-image: linear-gradient(
    to right,
    rgba(206, 78, 5, 0.849),
    rgba(110, 31, 0, 0.87)
  );
  background-size: cover;
  background-position: center;
  
}
.container-sm {
  max-width: 1100px; /* Set max-width for container */
  margin: 0 auto; /* Center container */
  
}

.card-container {
  display: flex;
  flex-wrap: wrap; /* Allow cards to wrap */
  justify-content: space-around; /* Align cards evenly */
  margin-top: 0px; /* Adjust margin as needed */
  border-radius: 5%;
}

.card {
  background-color: #ecebeb;
  width: calc(49% - 0px); /* Adjust width of each card */
  margin-top: 2%;
  margin-bottom: 2%;
  box-shadow: 0px 0px 20px rgb(0, 0, 0);
  transition: box-shadow 0.3s;
  border-radius: 2%;
  padding: 1%;
}
.card:hover {
  box-shadow: 0px 0px 20px rgb(255, 255, 255); /* Apply box-shadow when hovering */
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
  background-color: #ecebeb;
  padding: 15px;
}
</style>
