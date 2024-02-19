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
    async profileUpdate(
      firstName: string,
      lastName: string,
      nickName: string,
      email: string,
      bioInfo: string,
      phoneNumber: string,
      avatarUrl: string
    ) {
      const token = useAuthStore().token;
      const response = await fetch(`${BASE_URL}/user/profile-update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          nickName,
          email,
          bioInfo,
          phoneNumber,
          avatarUrl,
        }),
      });
      if (response.status == 200) {
        return true;
      } else {
        const responseData = await response.text();
        console.log("Error", responseData);
      }
    },
  },
});
