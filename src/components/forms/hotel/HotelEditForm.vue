<template>
  <div class="container-sm">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8 mx-auto text-muted">
          <h2 class="h3 mb-4 page-title">Update Hotel</h2>
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
                  >Hotel information</a
                >
              </li>
            </ul>
            <form v-if="hotel !=null" method="POST" @submit.prevent="onSubmit">
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
                  <label for="hotel-name">Hotel name</label>
                  <input
                    type="text"
                    id="hotel-name"
                    class="form-control"
                    placeholder="hotel-name"
                    v-model="hotel.name"
                    required="true"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    class="form-control"
                    v-model="hotel.location"
                    required="true"
                  />
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="hotel.description"
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
                    v-model="hotel.picture1"
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
                    v-model="hotel.picture2"
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
                    v-model="hotel.picture3"
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
                    v-model="hotel.picture4"
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
                    v-model="hotel.picture5"
                    placeholder="url"
                    required="true"
                  />
                </div>
                <div>
                  <hr class="my-4" />
                  <p>Amenities</p>
                  <div class="form-row amenities-row">
                    <div class="form-group col-md-2 flex-item">
                      <label for="freeparking">Free parking</label>
                      <select
                        class="form-control"
                        id="freeparking"
                        v-model="hotel.amenities.freeParking"
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
                      <label for="restaurant">Restaurant</label>
                      <select
                        class="form-control"
                        id="restaurant"
                        v-model="hotel.amenities.restaurant"
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
                      <label for="bar">Bar</label>
                      <select
                        class="form-control"
                        id="bar"
                        v-model="hotel.amenities.bar"
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
                      <label for="spa">Spa</label>
                      <select
                        class="form-control"
                        id="spa"
                        v-model="hotel.amenities.spa"
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
                      <label for="wifi">Wifi</label>
                      <select
                        class="form-control"
                        id="wifi"
                        v-model="hotel.roomFeatures.wifi"
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
                      <label for="airconditioning">Air Conditioning</label>
                      <select
                        class="form-control"
                        id="airconditioning"
                        v-model="hotel.roomFeatures.airConditioning"
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
                        v-model="hotel.roomFeatures.roomService"
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
                        v-model="hotel.roomFeatures.balcony"
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
                        v-model="hotel.roomFeatures.tv"
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
                      <label for="roomwifi">Room Wifi</label>
                      <select
                        class="form-control"
                        id="roomwifi"
                        v-model="hotel.roomFeatures.wifi"
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
import { type Hotel, useHotelStore } from "@/stores/hotel";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const hotel = ref<Hotel | null>(null);
const hotelStore = useHotelStore();
const updateAttempted = ref(false);
const successAttepted = ref(false);
const hotelId = route.params.id;

onMounted(async () => {
  const hotelId = route.params.id;
  const successHotelLoad = await hotelStore.loadHotel(hotelId);
  if (successHotelLoad) {
    console.log("HotelASD", successHotelLoad);
    hotel.value = successHotelLoad;
  }
});

async function onSubmit() {
  const updateSuccess = await hotelStore.updateHotel(hotel.value, hotelId);
  
  if (updateSuccess) {
    successAttepted.value = true;
    updateAttempted.value = false;
  } else {
    successAttepted.value = false;
    updateAttempted.value = true;
  
  }
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
