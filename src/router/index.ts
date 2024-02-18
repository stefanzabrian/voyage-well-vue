import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import UserSettingsView from "@/views/user/UserSettingsView.vue";
import UserSettingsNotificationView from "@/views/user/UserSettingsNotificationView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    }, {
      path: "/user-settings",
      name: "user-settings",
      component: UserSettingsView,
    }, {
      path: "/user-settings-notifications",
      name: "user-settings-notifications",
      component: UserSettingsNotificationView,
    },
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ["/login", "/register", "/user/forgot-password","/user/reset-password","/"];
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
