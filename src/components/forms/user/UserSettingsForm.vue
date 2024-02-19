<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { onMounted, reactive, ref } from "vue";

const updateAttempted = ref(false);
const successAttepted = ref(false);
const user = reactive({
  firstName: "",
  lastName: "",
  nickName: "",
  email: "",
  bioInfo: "",
  phoneNumber: "",
  avatarUrl: "",
});
const userStore = useUserStore();

onMounted(async () => {
  // Call the profileView function to fetch user data
  const userData = await userStore.profileView();

  // Populate the user reactive object with the fetched data
  user.firstName = userData.firstName;
  user.lastName = userData.lastName;
  user.nickName = userData.nickName;
  user.email = userData.email;
  user.bioInfo = userData.bioInfo;
  user.phoneNumber = userData.phoneNumber;
  user.avatarUrl = userData.avatarUrl;
});

async function onSubmit() {
  const successUpdated = userStore.profileUpdate(
    user.firstName,
    user.lastName,
    user.nickName,
    user.email,
    user.bioInfo,
    user.phoneNumber,
    user.avatarUrl
  );
  if (!successUpdated) {
    updateAttempted.value = true;
  } else {
    successAttepted.value = true;
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10 col-xl-8 mx-auto">
        <h2 class="h3 mb-4 page-title">Settings</h2>
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
                >Profile</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link active"
                id="contact-tab"
                data-toggle="tab"
                href="user-settings-notifications"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
                >Notifications</a
              >
            </li>
          </ul>
          <form method="PATCH" @submit.prevent="onSubmit">
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
              <div class="col-md-3 text-center mb-5">
                <div class="avatar avatar-xl">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    alt="..."
                    class="avatar-img rounded-circle"
                  />
                </div>
              </div>
              <div class="col">
                <div class="row align-items-center">
                  <div class="col-md-7">
                    <h4 class="mb-1">
                      {{ user.firstName }} {{ user.lastName }}
                    </h4>
                    <p class="small mb-3">
                      <span class="badge text-white">New York, USA</span>
                    </p>
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-md-7">
                    <p class="text-white">
                      {{ user.bioInfo }}
                    </p>
                  </div>
                  <div class="col">
                    <p class="small mb-0 text-white">Nec Urna Suscipit Ltd</p>
                    <p class="small mb-0 text-white">
                      P.O. Box 464, 5975 Eget Avenue
                    </p>
                    <p class="small mb-0 text-white">(537) 315-1481</p>
                  </div>
                </div>
              </div>
            </div>
            <hr class="my-4" />
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="firstname">First name</label>
                <input
                  type="text"
                  id="firstname"
                  class="form-control"
                  placeholder="Firstname"
                  v-model="user.firstName"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="last name">Last name</label>
                <input
                  type="text"
                  id="lastname"
                  class="form-control"
                  placeholder="Last name"
                  v-model="user.lastName"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="nickname">Nick name</label>
                <input
                  type="text"
                  id="nickname"
                  class="form-control"
                  placeholder="Nick name"
                  v-model="user.nickName"
                />
              </div>
              <div class="form-group col-md-2">
                <label for="phone-number">Phone number</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone-number"
                  placeholder="+40 727 999 000..."
                  v-model="user.phoneNumber"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="example@email.com"
                v-model="user.email"
              />
            </div>
            <div class="form-group">
              <label for="bio-info">Bio info</label>
              <input
                type="text"
                class="form-control"
                id="bio0info"
                placeholder="Say something about you..."
                v-model="user.bioInfo"
              />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="avatar-url">Avatar picture url</label>
                <input
                  type="text"
                  class="form-control"
                  id="avatar-url"
                  placeholder="https://url.jpg"
                  v-model="user.avatarUrl"
                />
              </div>
            </div>
            <hr class="my-4" />
            <button type="submit" class="btn btn-primary">Save Change</button>
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
</style>
