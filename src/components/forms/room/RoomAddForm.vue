<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRoomStore } from "@/stores/room";
import { reactive, ref } from "vue";

const addAttempted = ref(false);
const successAddAttepted = ref(false);
const room = reactive({
  number: "",
  description: "",
  picture1: "",
  picture2: "",
  picture3: "",
  picture4: "",
  picture5: "",
  isWifi: false,
  isBalcony: false,
  isBathroom: false,
  isTv: false,
  isAirConditioning: false,
  isHeat: false,
  isRoomService: false,
  roomtype: "",
});
const userStore = useUserStore();

async function onSubmit(id:any) {
  const addSuccess = useRoomStore().addRoom(
    id,
    room.number,
    room.description,
    room.picture1,
    room.picture2,
    room.picture3,
    room.picture4,
    room.picture5,
    room.isWifi,
    room.isBalcony,
    room.isBathroom,
    room.isTv,
    room.isAirConditioning,
    room.isHeat,
    room.isRoomService,
    room.roomtype
  );
  if (await addSuccess) {
    successAddAttepted.value = true;
    addAttempted.value = false;
  } else {
    addAttempted.value = true;
    successAddAttepted.value = false;
  }

  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10 col-xl-8 mx-auto">
        <h2 class="h3 mb-4 page-title">Add Room</h2>
        <div class="my-4">
          <ul class="nav nav-tabs mb-4" id="myTab" role="tablist"></ul>
          <form method="POST" @submit.prevent="onSubmit($route.params.id)">
            <div class="row mt-5 align-items-center">
              <!--Alert-->
              <div
                v-if="successAddAttepted"
                class="alert alert-light"
                role="alert"
              >
                Save Success!
              </div>
              <!--Alert-->
              <div v-if="addAttempted" class="alert alert-light" role="alert">
                Save Failed!
              </div>
            </div>
            <hr class="my-4" />
            <p>Room information</p>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="roomnumber">Room number</label>
                <input
                  type="text"
                  id="roomnumber"
                  class="form-control"
                  v-model="room.number"
                  placeholder=""
                  required="true"
                />
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="room.description"
                  placeholder=""
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
                  v-model="room.picture1"
                  placeholder="https://url.jpg"
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
                  placeholder="https://url.jpg"
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
                  placeholder="https://url.jpg"
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
                  placeholder="https://url.jpg"
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
                  placeholder="https://url.jpg"
                  required="true"
                />
              </div>
            </div>
            <div>
              <hr class="my-4" />
              <p>Features</p>
              <div class="form-row amenities-row">
                <div class="form-group col-md-2 flex-item">
                  <label for="wifi">Wifi</label>
                  <select class="form-control" id="wifi"  v-model="room.isWifi" required="true">
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="balcony">Balcony</label>
                  <select class="form-control" id="balcony" v-model="room.isBalcony" required="true">
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="bathroom">Bathroom</label>
                  <select class="form-control" id="bathroom" v-model="room.isBathroom" required="true">
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div class="form-row amenities-row">
                <div class="form-group col-md-2 flex-item">
                  <label for="tv">Tv</label>
                  <select class="form-control" id="tv" v-model="room.isTv" required="true">
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="airconditioning">Air Conditioning</label>
                  <select
                    class="form-control"
                    id="airconditioning"
                    v-model="room.isAirConditioning"
                    required="true"
                  >
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="heat">Heat</label>
                  <select class="form-control" id="heat" v-model="room.isHeat" required="true">
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div class="form-row amenities-row">
                <div class="form-group col-md-2 flex-item">
                  <label for="roomservice">Room Service</label>
                  <select class="form-control" id="roomservice" v-model="room.isRoomService" required="true">
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div class="form-group col-md-2 flex-item">
                  <label for="roomtype">Room Type</label>
                  <select class="form-control" id="roomtype" v-model="room.roomtype" required="true">
                    <option value="" disabled selected hidden>Choose...</option>
                    <option value="SINGLE">Single</option>
                    <option value="DOUBLE">Double</option>
                    <option value="TRIPLE">Triple</option>
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
