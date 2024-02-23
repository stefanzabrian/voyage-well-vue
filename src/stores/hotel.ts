import { BASE_URL } from "@/router/api";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useHotelStore = defineStore({
  id: "hotelStore",
  actions: {
    async addHotel(
      hotelName: string,
      location: string,
      description: string,
      picture1: string,
      picture2: string,
      picture3: string,
      picture4: string,
      picture5: string,
      isFreeParking: boolean,
      isRestaurant: boolean,
      isBar: boolean,
      isSpa: boolean,
      isWifi: boolean,
      isAirConditioning: boolean,
      isRoomService: boolean,
      isBalcony: boolean,
      isTv: boolean,
      isRoomWifi: boolean
    ) {
      const token = useAuthStore().token;
      const response = await fetch(`${BASE_URL}/hotel/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotelName,
          location,
          description,
          picture1,
          picture2,
          picture3,
          picture4,
          picture5,
          isFreeParking,
          isRestaurant,
          isBar,
          isSpa,
          isWifi,
          isAirConditioning,
          isRoomService,
          isBalcony,
          isTv,
          isRoomWifi
        }),
      });
      if (response.status == 200) {
        return true;
      } else {
        const responseData = await response.json();
        console.log("Error", responseData);
        console.log(response.status);
        return false;
      }
    },
  },
});
