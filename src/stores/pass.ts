import { defineStore } from "pinia";

export const usePassStore = defineStore({
  id: "pass",
  state: () => {
    const storedPassToken = localStorage.getItem("forgotPasswordToken");
    const storedChangePassToken = localStorage.getItem("changePasswordToken");

    return {
      passToken: storedPassToken ? storedPassToken : null,
      passChangeToken: storedChangePassToken ? storedChangePassToken : null,
    };
  },
});
