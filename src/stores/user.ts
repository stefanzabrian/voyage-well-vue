import { useAuthStore } from "./auth";
import { BASE_URL } from "@/router/api";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "userStore",

  actions: {
    async profileView() {
      const token = useAuthStore().token;
      const response = await fetch(`${BASE_URL}/user/profile-view`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const user = await response.json();
        return user;
      } else {
        const errorBody = response.json();
        console.log(errorBody);
        console.log(JSON.stringify(errorBody));
      }
    },
  },
});
