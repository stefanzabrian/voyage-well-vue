<template>
  <div class="container-sm">
    <div class="container">
      <div class="card-container">
        <div v-if="hotel" class="card-container">
          <div class="card">
            <div style="padding: 0%">
              <div
                id="carouselExampleFade"
                class="carousel slide carousel-fade my-img"
              >
                <div class="carousel-inner">
                  <div
                    class="carousel-item"
                    v-for="(image, index) in hotelImages(hotel)"
                    :key="index"
                    :class="{ active: index === 0 }"
                  >
                    <img
                      :src="image"
                      class="cursor-pointer d-block w-100 my-img2"
                      alt="..."
                    />
                    <button
                      class="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleFade"
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
                      data-bs-target="#carouselExampleFade"
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
              <div class="card-body card-body-1">
                <div>
                  <h5 class="card-title">Amenities</h5>
                  <p class="card-text">Spa: {{ hotel.spa ? "Yes" : "No" }}</p>
                  <p class="card-text">
                    Restaurant: {{ hotel.restaurant ? "Yes" : "No" }}
                  </p>
                  <p class="card-text">
                    Free Parking: {{ hotel.freeParking ? "Yes" : "No" }}
                  </p>
                  <p class="card-text">Bar: {{ hotel.bar ? "Yes" : "No" }}</p>
                  <p class="card-text">Wifi: {{ hotel.wifi ? "Yes" : "No" }}</p>
                  <h5 class="card-title">Room features</h5>
                  <p class="card-text">
                    Air Conditioning: {{ hotel.airConditioning ? "Yes" : "No" }}
                  </p>
                  <p class="card-text">
                    Room Service: {{ hotel.roomService ? "Yes" : "No" }}
                  </p>
                  <p class="card-text">Tv: {{ hotel.tv ? "Yes" : "No" }}</p>
                  <p class="card-text">
                    Balcony: {{ hotel.balcony ? "Yes" : "No" }}
                  </p>
                  <p class="card-text">
                    Room Wifi: {{ hotel.roomWifi ? "Yes" : "No" }}
                  </p>
                </div>
              </div>
            </div>
            <div class="card-body-2">
              <div class="card-body card-body-2">
                <h5 class="card-title">{{ hotel.hotelName }}</h5>
                <p class="card-text">{{ hotel.location }}</p>
                <p class="card-text">{{ hotel.description }}</p>
                <a href="#!" class="btn btn-primary" data-mdb-ripple-init
                  >Button</a
                >
              </div>
            </div>
          </div>
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHotelStore } from "@/stores/hotel";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const hotel = ref({});
const hotelStore = useHotelStore();

const hotelImages = (hotel: { [key: string]: any }) => {
  const images = [];
  for (let i = 1; i <= 5; i++) {
    const picture = hotel[`picture${i}`];
    if (picture && typeof picture === "string") {
      // Check if picture is a valid string
      images.push(picture);
    }
  }
  return images;
};

onMounted(async () => {
  const hotelId = route.params.id;
  const hotelQuery = route.query.hotelId;

  if (hotelQuery) {
    hotel.value = JSON.parse(hotelQuery);
  }
  const successHotelLoad = await hotelStore.loadHotel(hotelId);
  if (successHotelLoad) {
    hotel.value = successHotelLoad;
  }
});
</script>
<style scoped>
.card-body {
  background-color: #fff;
  padding: 20px;
}

/* Media query for phone view */
@media (max-width: 767px) {
  .card-body-2 {
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
    rgb(255, 94, 0),
    rgba(31, 9, 0, 0.589)
  );
  background-size: cover;
  background-position: center;
}
.container-sm {
  max-width: 1200px; /* Set max-width for container */
  margin: 0 auto; /* Center container */
}

.card-container {
  display: flex;
  flex-wrap: wrap; /* Allow cards to wrap */
  justify-content: space-around; /* Align cards evenly */
  margin-top: 0px; /* Adjust margin as needed */
  border-radius: 5%;
}
.my-img {
  width: 400px;
  height: 200px;
  box-shadow: 0px 0px 10px rgb(0, 0, 0);
}
.my-img:hover {
  box-shadow: 0px 0px 10px rgb(43, 139, 194);
}
.my-img2 {
  height: 200px;
  border-radius: 5px;
}
.card-body-2 {
  width: calc(100% - 0px); /* Adjust width of each card */
  height: calc(100% - 0px); /* Adjust width of each card */
}
.card-body-1 {
  height: 500px;
  text-shadow: 0px 0px 10px rgba(78, 151, 194, 0.575);
}
.card {
  background-color: #a0809d;
  width: calc(100% - 0px); /* Adjust width of each card */
  margin-top: 1%;
  margin-bottom: 1%;
  box-shadow: 0px 0px 20px rgb(0, 0, 0);
  transition: box-shadow 0.3s;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.card:hover {
  box-shadow: 0px 0px 20px rgb(255, 255, 255); /* Apply box-shadow when hovering */
}

.bg-image {
  position: relative;
  overflow: hidden;
  background-image: url("../../.././assets/pictures/aleksandar-pasaric.jpg");
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
