import router from "@/router";
import { BASE_URL } from "@/router/api";
import { defineStore } from "pinia";

// Function to parse JWT token
function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedAuthority = localStorage.getItem("authority");
    const storedAvatarUrl = localStorage.getItem("avatarUrl");
    const storedNickName = localStorage.getItem("nickName");

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken ? JSON.parse(storedToken) : null,
      authority: storedAuthority ? JSON.parse(storedAuthority) : null,
      avatarUrl: storedAvatarUrl ? JSON.parse(storedAvatarUrl) : null,
      nickName: storedNickName ? JSON.parse(storedNickName) : null,
    };
  },

  getters: {
    isAuthenticated(): boolean {
      return !!this.token && !this.isTokenExpired;
    },

    isTokenExpired() {
      if (!this.token) return true;
      const tokenPayload = parseJwt(this.token);
      const expirationTime = tokenPayload.exp * 1000; // Expiration time in milliseconds
      return Date.now() >= expirationTime;
    },
  },

  actions: {
    async login(email: string, password: string) {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const accessToken = responseData.accessToken;
        const tokenPayload = parseJwt(accessToken);
        const authority = tokenPayload.authorities[0];
        const avatarUrl = responseData.avatarUrl;
        const nickName = responseData.nickName;

        localStorage.setItem("user", JSON.stringify(email));
        localStorage.setItem("token", JSON.stringify(accessToken));
        localStorage.setItem("authority", JSON.stringify(authority));
        localStorage.setItem("avatarUrl", JSON.stringify(avatarUrl));
        localStorage.setItem("nickName", JSON.stringify(nickName));
        this.user = email;
        this.token = accessToken;
        this.authority = authority;
        this.avatarUrl = avatarUrl;
        this.nickName = nickName;
        router.push("/");
        return true;
      } else {
        const responseData = await response.json();
        console.log("Error: " , responseData)
        return false;
      }
    },
    async register(
      email: string,
      password: string,
      confirmPassword: string,
      firstName: string,
      lastName: string,
      nickName: string,
      acceptedConditions: boolean
    ) {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          nickName,
          acceptedConditions,
        }),
      });
      if (response.status == 201) {
        router.push("/login");
        return true;
      } else if (response.status == 409) {
        const responseData = await response.json();
        console.log("Error: " , responseData)
        console.log("Status: " , response.status)
        return 409;
      } else if (response.status == 400) {
        const responseData = await response.json();
        console.log("Error: " , responseData)
        console.log("Status: " , response.status)
        return 400;
      } else if (response.status == 500) {
        const responseData = await response.json();
        console.log("Error: " , responseData)
        console.log("Status: " , response.status)
        return 500;
      } else {
        const responseData = await response.json();
        console.log("Error: " , responseData)
        console.log("Status: " , response.status)
        return false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.authority = null;
      this.avatarUrl = null;
      this.nickName = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("authority");
      localStorage.removeItem("avatarUrl");
      localStorage.removeItem("nickName");
      router.push("/login");
    },
  },
});
