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

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken ? JSON.parse(storedToken) : null,
      authority: storedAuthority ? JSON.parse(storedAuthority) : null,
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

        localStorage.setItem("user", JSON.stringify(email));
        localStorage.setItem("token", JSON.stringify(accessToken));
        localStorage.setItem("authority", JSON.stringify(authority));
        this.user = email;
        this.token = accessToken;
        this.authority = authority;
        router.push("/");
        return true;
      } else {
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
        return 409;
      } else if (response.status == 400) {
        return 400;
      } else if (response.status == 500) {
        return 500;
      } else {
        return false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.authority = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("authority");
      router.push("/login");
    },
  },
});
