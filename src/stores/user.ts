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
      const auth = useAuthStore();
      const token = auth.token;
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
        localStorage.setItem("avatarUrl", JSON.stringify(avatarUrl));
        localStorage.setItem("nickName", JSON.stringify(nickName));
        auth.avatarUrl = avatarUrl;
        auth.nickName = nickName;
        return true;
      } else {
        const responseData = await response.json();
        console.log("Error", responseData);
      }
    },
    async recoverAccount(email:string) {
      const response = await fetch(`${BASE_URL}/forgot-password`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(email),
      });
      localStorage.removeItem("forgotPasswordToken");
      if (response.status == 200) {
        const responseData = await response.text();
        localStorage.setItem("forgotPasswordToken", responseData);
        return true;
      } else {
        const responseData = await response.json();
        console.log("Error", responseData);
        console.log(response.status);
        return false;
      }
    }
  },
});
