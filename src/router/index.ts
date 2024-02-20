import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import UserSettingsView from "@/views/user/UserSettingsView.vue";
import UserSettingsNotificationView from "@/views/user/UserSettingsNotificationView.vue";
import ForgotPasswordView from "@/views/user/ForgotPasswordView.vue";
import ResetPasswordView from "@/views/user/ResetPasswordView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  const publicPages = ["/login", "/register", "/forgot-password","/reset-password","/"];
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
