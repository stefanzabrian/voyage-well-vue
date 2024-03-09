import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import UserSettingsView from "@/views/user/UserSettingsView.vue";
import UserSettingsNotificationView from "@/views/user/UserSettingsNotificationView.vue";
import ForgotPasswordView from "@/views/user/ForgotPasswordView.vue";
import ResetPasswordView from "@/views/user/ResetPasswordView.vue";
import RequestChangePasswordView from "@/views/user/RequestChangePasswordView.vue";
import ChangePasswordView from "@/views/user/ChangePasswordView.vue";
import HotelAddView from "@/views/hotel/HotelAddView.vue";
import HotelAllView from "@/views/hotel/HotelAllView.vue";
import HotelSingleView from "@/views/hotel/HotelSingleView.vue";
import HotelEditView from "@/views/hotel/HotelEditView.vue";
import RoomAddView from "@/views/room/RoomAddView.vue";
import RoomAllView from "@/views/room/RoomAllView.vue";
import RoomSingleView from "@/views/room/RoomSingleView.vue";
import RoomEditView from "@/views/room/RoomEditView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/room-edit-by/:id",
      name: "room-edit-by-id",
      component: RoomEditView,
    },
    {
      path: "/room-by/:id",
      name: "room-by-id",
      component: RoomSingleView,
    },
    {
      path: "/room-all-by-hotel/:id",
      name: "room-all-by-hotel-id",
      component: RoomAllView,
    },
    {
      path: "/room-add/:id",
      name: "room-add",
      component: RoomAddView,
    },
    {
      path: "/edit-hotel-view/:id",
      name: "edit-hotel-view",
      component: HotelEditView,
    },
    {
      path: "/single-hotel-view/:id",
      name: "single-hotel-view",
      component: HotelSingleView,
    },
    {
      path: "/hotel-all",
      name: "hotel-all",
      component: HotelAllView,
    },
    {
      path: "/hotel-add",
      name: "hotel-add",
      component: HotelAddView,
    },
    {
      path: "/update-password",
      name: "update-password",
      component: ChangePasswordView,
      props: (route) => ({ token: route.query.token }),
      beforeEnter: (to, from, next) => {
        const passChangeToken = localStorage.getItem("changePasswordToken");
        const tokenFromRoute = to.query.token;
        if (passChangeToken === tokenFromRoute) {
          // If passToken matches the token from the route, proceed to ResetPasswordView
          next();
        } else {
          // If passToken does not match, redirect to some other route or display an error
          alert("Link Expired or Wrong Link!");
          next("/"); // Redirect to some other route
        }
      },
    },
    {
      path: "/request-change-password",
      name: "request-change-password",
      component: RequestChangePasswordView,
    },
    {
      path: "/reset-password",
      name: "resset-password",
      component: ResetPasswordView,
      props: (route) => ({ token: route.query.token }),
      beforeEnter: (to, from, next) => {
        const passToken = localStorage.getItem("forgotPasswordToken");
        const tokenFromRoute = to.query.token;
        if (passToken === tokenFromRoute) {
          // If passToken matches the token from the route, proceed to ResetPasswordView
          next();
        } else {
          // If passToken does not match, redirect to some other route or display an error
          alert("Link Expired or Wrong Link!");
          next("/"); // Redirect to some other route
        }
      },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPasswordView,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/user-settings",
      name: "user-settings",
      component: UserSettingsView,
    },
    {
      path: "/user-settings-notifications",
      name: "user-settings-notifications",
      component: UserSettingsNotificationView,
    },
  ],
});

router.beforeEach(async (to) => {
  const publicPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/",
  ];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  // if auth is required and the user is not logged in
  if ((authRequired && !auth.user) || (authRequired && !auth.token)) {
    return auth.logout();
  }
  if (authRequired && auth.isTokenExpired) {
    // Handle expired token (e.g., refresh token or logout)
    // For now, let's just log the user out
    return auth.logout();
  }
});

export default router;
