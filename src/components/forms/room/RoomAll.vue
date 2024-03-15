<template>
  <div class="container-sm">
    <header>
      <!-- Background image -->
      <div class="p-5 text-center bg-image" style="height: 20%">
        <div>
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="header">
              <h1 class="mb-3 h">Hotel's rooms to Stay</h1>
              <h4 class="mb-3 h"></h4>
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
      <div v-if="rooms && rooms.length" class="card-container">
        <div class="card-container">
          <div class="card" v-for="room in rooms" :key="room.id">
            <div style="padding: 0%">
              <div
                :id="'carouselExampleFade_' + room.id"
                class="carousel slide carousel-fade my-img"
              >
                <div class="carousel-inner">
                  <div
                    class="carousel-item"
                    v-for="(image, index) in roomImages(room)"
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
                      :data-bs-target="'#carouselExampleFade_' + room.id"
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
                      :data-bs-target="'#carouselExampleFade_' + room.id"
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
                <h5 class="card-title">Room Features</h5>
                <p class="card-text">
                  Balcony: {{ room.feature.balcony ? "Yes" : "No" }}
                </p>
                <p class="card-text">
                  Tv: {{ room.feature.tv ? "Yes" : "No" }}
                </p>

                <p class="card-text">
                  Rooms service: {{ room.feature.roomService ? "Yes" : "No" }}
                </p>

                <p class="card-text">
                  Air Conditioning:
                  {{ room.feature.airConditioning ? "Yes" : "No" }}
                </p>

                <p class="card-text">
                  Heat: {{ room.feature.heat ? "Yes" : "No" }}
                </p>

                <p class="card-text">
                  Wifi: {{ room.feature.wifi ? "Yes" : "No" }}
                </p>
                <p class="card-text">
                  Bathroom: {{ room.feature.bathroom ? "Yes" : "No" }}
                </p>
              </div>
            </div>
            <div class="card-body-2">
              <div class="card-body card-body-2">
                <h5 class="card-title">Number : {{ room.number }}</h5>
                <h5 class="card-title">Price : {{ room.price }}</h5>
                <h5 class="card-title">Type : {{ getTypeName(room.type) }}</h5>
                <p class="card-text">Description : {{ room.description }}</p>
                <router-link
                  :to="{ name: 'room-by-id', params: { id: room.id } }"
                  class="btn btn-primary me-1"
                  data-mdb-ripple-init
                  >View Room</router-link
                >
                <router-link
                  :to="{ name: 'room-edit-by-id', params: { id: room.id } }"
                  class="btn btn-primary me-1"
                  data-mdb-ripple-init
                  >Edit Room</router-link
                >
                <button @click="deleteRomm(room.id)" class="btn btn-danger" data-mdb-ripple-init
                  >Delete Room</button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="card-container">
        <h1 class="text-white">No Rooms yet</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoomStore, type Room } from "@/stores/room";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const rooms = ref();
const route = useRoute();
const roomStore = useRoomStore();

onMounted(async () => {
  const id = route.params.id;
  rooms.value = await roomStore.loadAllRomms(id);
  console.log("Rooms:", rooms.value); // Log the value of hotels
});

const roomImages = (room: { [key: string]: any }) => {
  const images = [];
  for (let i = 1; i <= 5; i++) {
    const picture = room[`picture${i}`];
    if (picture && typeof picture === "string") {
      // Check if picture is a valid string
      images.push(picture);
    }
  }
  return images;
};
const getTypeName = (type: string) => {
  switch (type) {
    case "SINGLE":
      return "Single";
    case "DOUBLE":
      return "Double";
    case "TRIPLE":
      return "Triple";
    default:
      return "";
  }
};

const deleteRomm = async (roomId: number) => {
  const successDeleted = await roomStore.deleteRoomById(roomId);

  if (successDeleted) {
    location.reload();
  } else {
    alert("Error! could not delete room");
  }
};
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
  height: 350px;
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
