<template>
  <div class="container-sm">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8 mx-auto text-muted">
          <h2 v-if="room != null" class="h3 mb-4 page-title">
          </h2>
          <div class="my-4">
            <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="user-settings"
                  role="tab"
                  aria-controls="home"
                  aria-selected="false"
                  >Room information</a
                >
              </li>
            </ul>
            <form v-if="room != null" method="POST" @submit.prevent="onSubmit">
              <div class="row mt-5 align-items-center">
                <!--Alert-->
                <div
                  v-if="updateAttempted"
                  class="alert alert-light"
                  role="alert"
                >
                  Update failed!
                </div>
                <!--Alert-->
                <div
                  v-if="successAttepted"
                  class="alert alert-light"
                  role="alert"
                >
                  Update Success!
                </div>
              </div>
              <hr class="my-4" />
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="room-number">Room number</label>
                  <input
                    type="text"
                    id="room-number"
                    class="form-control"
                    placeholder=""
                    v-model="room.number"
                    required="true"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="room-price">Room price</label>
                  <input
                    type="text"
                    id="room-price"
                    class="form-control"
                    placeholder=""
                    v-model="room.price"
                    required="true"
                  />
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="room.description"
                    required="true"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div class="form-row">
                <hr class="my-4" />
                <div class="form-group">
                  <label for="picture1">Picture 1</label>
                  <input
                    type="text"
                    class="form-control"
                    id="picture1"
                    v-model="room.picture1"
                    placeholder="url"
                    required="true"
                  />
                </div>
                <div class="form-group">
                  <label for="picture2">Picture 2</label>
                  <input
                    type="text"
                    class="form-control"
                    id="picture2"
                    v-model="room.picture2"
                    placeholder="url"
                    required="true"
                  />
                </div>
                <div class="form-group">
                  <label for="picture3">Picture 3</label>
                  <input
                    type="text"
                    class="form-control"
                    id="picture3"
                    v-model="room.picture3"
                    placeholder="url"
                    required="true"
                  />
                </div>
                <div class="form-group">
                  <label for="picture4">Picture 4</label>
                  <input
                    type="text"
                    class="form-control"
                    id="picture4"
                    v-model="room.picture4"
                    placeholder="url"
                    required="true"
                  />
                </div>
                <div class="form-group">
                  <label for="picture5">Picture 5</label>
                  <input
                    type="text"
                    class="form-control"
                    id="picture5"
                    v-model="room.picture5"
                    placeholder="url"
                    required="true"
                  />
                </div>
                <div>
                  <hr class="my-4" />
                  <p>Amenities</p>
                  <div class="form-row amenities-row">
                    <div class="form-group col-md-2 flex-item">
                      <label for="freewifi">Free wifi</label>
                      <select
                        class="form-control"
                        id="freewifi"
                        v-model="room.feature.wifi"
                        required="true"
                      >
                        <option value="" disabled selected hidden>
                          Choose...
                        </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div class="form-group col-md-2 flex-item">
                      <label for="balcony">Balcony</label>
                      <select
                        class="form-control"
                        id="balcony"
                        v-model="room.feature.balcony"
                        required="true"
                      >
                        <option value="" disabled selected hidden>
                          Choose...
                        </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div class="form-group col-md-2 flex-item">
                      <label for="bathroom">Bathroom</label>
                      <select
                        class="form-control"
                        id="bathroom"
                        v-model="room.feature.bathroom"
                        required="true"
                      >
                        <option value="" disabled selected hidden>
                          Choose...
                        </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div class="form-group col-md-2 flex-item">
                      <label for="tv">Tv</label>
                      <select
                        class="form-control"
                        id="tv"
                        v-model="room.feature.tv"
                        required="true"
                      >
                        <option value="" disabled selected hidden>
                          Choose...
                        </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div class="form-group col-md-2 flex-item">
                      <label for="air-conditioning">Air Conditioning</label>
                      <select
                        class="form-control"
                        id="air-conditioning"
                        v-model="room.feature.airConditioning"
                        required="true"
                      >
                        <option value="" disabled selected hidden>
                          Choose...
                        </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <hr class="my-4" />
                  <p>Room Features</p>
                  <div class="form-row room-features-row">
                    <div class="form-group col-md-2 flex-item">
                      <label for="heat">Heat</label>
                      <select
                        class="form-control"
                        id="heat"
                        v-model="room.feature.heat"
                        required="true"
                      >
                        <option value="" disabled selected hidden>
                          Choose...
                        </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div class="form-group col-md-2 flex-item">
                      <label for="roomservice">Room Service</label>
                      <select
                        class="form-control"
                        id="roomservice"
                        v-model="room.feature.roomService"
                        required="true"
                      >
                        <option value="" disabled selected hidden>
                          Choose...
                        </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <button type="submit" class="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHotelStore } from "@/stores/hotel";
import { type Room, useRoomStore } from "@/stores/room";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const roomStore = useRoomStore();
const updateAttempted = ref(false);
const successAttepted = ref(false);
const roomId = route.params.id;
const previousPageLink = ref("");
const room = ref<Room>();
const hotelStore = useHotelStore();

onMounted(async () => {
  const successFetchRoom = await roomStore.fetchRoomById(roomId);

  if (successFetchRoom !== null && successFetchRoom !== undefined) {
    console.log("Room", successFetchRoom);
    room.value = successFetchRoom;

    // Check if the router instance is initialized and if the route is available
    if (router && router.currentRoute.value) {
      // Set the previous page link dynamically
      previousPageLink.value = router.currentRoute.value.fullPath;
    } else {
      console.error("Router instance or route is not available.");
    }
  } else {
    console.error("Failed to load hotel data.");
  }
});

async function onSubmit() {
  const updateSuccess = await roomStore.roomUpdate(room.value, roomId);

  if (updateSuccess) {
    successAttepted.value = true;
    updateAttempted.value = false;
    // Route to another page after 5 seconds
    setTimeout(() => {
      router.push(`/room-all-by-hotel/${hotelStore.hotelId}`);
    }, 2000);
  } else {
    successAttepted.value = false;
    updateAttempted.value = true;
  }
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin-top: 0%;
  background-image: linear-gradient(
    to right,
    rgb(9, 54, 97),
    rgba(187, 53, 0, 0.753)
  );
  background-size: cover;
  background-position: center;
}
.text-muted:not(input) {
  color: #d5ffd5 !important;
}
</style>
