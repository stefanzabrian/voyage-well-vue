<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useHotelStore } from "@/stores/hotel";
import { reactive, ref } from "vue";

const addAttempted = ref(false);
const successAddAttepted = ref(false);
const hotel = reactive({
  hotelName: "",
  location: "",
  description: "",
  picture1: "",
  picture2: "",
  picture3: "",
  picture4: "",
  picture5: "",
  isFreeParking: false,
  isRestaurant: false,
  isBar: false,
  isSpa: false,
  isWifi: false,
  isAirConditioning: false,
  isRoomService: false,
  isBalcony: false,
  isTv: false,
  isRoomWifi: false,
});
const userStore = useUserStore();

async function onSubmit() {
  const addSuccess = useHotelStore().addHotel(
    hotel.hotelName,
    hotel.location,
    hotel.description,
    hotel.picture1,
    hotel.picture2,
    hotel.picture3,
    hotel.picture4,
    hotel.picture5,
    hotel.isFreeParking,
    hotel.isRestaurant,
    hotel.isBar,
    hotel.isSpa,
    hotel.isWifi,
    hotel.isAirConditioning,
    hotel.isRoomService,
    hotel.isBalcony,
    hotel.isTv,
    hotel.isRoomWifi
  );
  if (await addSuccess) {
    successAddAttepted.value = true;
    addAttempted.value = false;
  } else {
    addAttempted.value = true;
    successAddAttepted.value = false;
  }
  
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10 col-xl-8 mx-auto">
        <h2 class="h3 mb-4 page-title">Add Hotel</h2>
        <div class="my-4">
          <ul class="nav nav-tabs mb-4" id="myTab" role="tablist"></ul>
          <form method="POST" @submit.prevent="onSubmit">
            <div class="row mt-5 align-items-center">
              <!--Alert-->
              <div v-if="successAddAttepted" class="alert alert-light" role="alert">
                Save Success!
              </div>
              <!--Alert-->
              <div
                v-if="addAttempted"
                class="alert alert-light"
                role="alert"
              >
                Save Failed!
              </div>
            </div>
            <hr class="my-4" />
            <p>Hotel information</p>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="hotelname">Hotel name</label>
                <input
                  type="text"
                  id="hotelname"
                  class="form-control"
                  placeholder="hotel name"
                  v-model="hotel.hotelName"
                  required="true"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="location">Location</label>
                <input
                  type="text"
                  id="location"
                  class="form-control"
                  placeholder="location"
                  v-model="hotel.location"
                  required="true"
                />
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="description"
                  v-model="hotel.description"
                  required="true"
                />
              </div>
            </div>
            <hr class="my-4" />
            <p>Galery</p>
            <div class="form-row">
              <div class="form-group">
                <label for="picture1">Picture 1</label>
                <input
                  type="text"
                  class="form-control"
                  id="picture1"
                  placeholder="https://url.jpg"
                  v-model="hotel.picture1"
                  required="true"
                />
              </div>
              <div class="form-group">
                <label for="picture2">Picture 2</label>
                <input
                  type="text"
                  class="form-control"
                  id="picture2"
                  placeholder="https://url.jpg"
                  v-model="hotel.picture2"
                  required="true"
                />
              </div>
              <div class="form-group">
                <label for="picture3">Picture 3</label>
                <input
                  type="text"
                  class="form-control"
                  id="picture3"
                  placeholder="https://url.jpg"
                  v-model="hotel.picture3"
                  required="true"
                />
              </div>
              <div class="form-group">
                <label for="picture4">Picture 4</label>
                <input
                  type="text"
                  class="form-control"
                  id="picture4"
                  placeholder="https://url.jpg"
                  v-model="hotel.picture4"
                  required="true"
                />
              </div>
              <div class="form-group">
                <label for="picture5">Picture 5</label>
                <input
                  type="text"
                  class="form-control"
                  id="picture5"
                  placeholder="https://url.jpg"
                  v-model="hotel.picture5"
                  required="true"
                />
              </div>
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
                    v-model="hotel.isFreeParking"
                    required="true"
                  >
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="restaurant">Restaurant</label>
                  <select
                    class="form-control"
                    id="restaurant"
                    v-model="hotel.isRestaurant"
                    required="true"
                  >
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="bar">Bar</label>
                  <select
                    class="form-control"
                    id="bar"
                    v-model="hotel.isBar"
                    required="true"
                  >
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="spa">Spa</label>
                  <select
                    class="form-control"
                    id="spa"
                    v-model="hotel.isSpa"
                    required="true"
                  >
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="wifi">Wifi</label>
                  <select
                    class="form-control"
                    id="wifi"
                    v-model="hotel.isWifi"
                    required="true"
                  >
                    <option value="" disabled selected hidden>Choose...</option>
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
                    v-model="hotel.isAirConditioning"
                    required="true"
                  >
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="roomservice">Room Service</label>
                  <select
                    class="form-control"
                    id="roomservice"
                    v-model="hotel.isRoomService"
                    required="true"
                  >
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="balcony">Balcony</label>
                  <select
                    class="form-control"
                    id="balcony"
                    v-model="hotel.isBalcony"
                    required="true"
                  >
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="tv">Tv</label>
                  <select
                    class="form-control"
                    id="tv"
                    v-model="hotel.isTv"
                    required="true"
                  >
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="roomwifi">Room Wifi</label>
                  <select
                    class="form-control"
                    id="roomwifi"
                    v-model="hotel.isRoomWifi"
                    required="true"
                  >
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>
            <hr class="my-4" />
            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
body {
  color: #8e9194;
  background-color: #f4f6f9;
}
.avatar-xl img {
  width: 110px;
}
.rounded-circle {
  border-radius: 50% !important;
}
img {
  vertical-align: middle;
  border-style: none;
}
.text-muted {
  color: #aeb0b4 !important;
}
.text-muted {
  font-weight: 300;
}
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #4d5154;
  background-color: #ffffff;
  background-clip: padding-box;
  border: 1px solid #eef0f3;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.amenities-row,
.room-features-row {
  display: flex;
  flex-wrap: wrap;
}

.flex-item {
  flex: 1;
  margin-right: 10px; /* Add margin between the dropdowns */
}
</style>
