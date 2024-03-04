import { BASE_URL } from "@/router/api";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { ref } from "vue";

export interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  picture1: string;
  picture2: string;
  picture3: string;
  picture4: string;
  picture5: string;
  amenities: {
    id: number;
    spa: boolean;
    restaurant: boolean;
    bar: boolean;
    wifi: boolean;
    freeParking: boolean;
  };
  roomFeatures: {
    id: number;
    wifi: boolean;
    roomService: boolean;
    airConditioning: boolean;
    tv: boolean;
    balcony: boolean;
  };
}

const data = ref<Hotel[]>([]);
const singleHotel = ref<Hotel | null>(null);

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
          isRoomWifi,
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
    async loadHotels() {
      const token = useAuthStore().token;
      const response = await fetch(`${BASE_URL}/hotel/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        data.value = await response.json();
        return data.value;
      } else {
        return false;
      }
    },
    async loadHotel(id: any) {
      const token = useAuthStore().token;
      const response = await fetch(`${BASE_URL}/hotel/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        singleHotel.value = (await response.json()) as Hotel;

        return singleHotel.value;
      } else {
        return false;
      }
    },
    async updateHotel(hotel: Hotel, id: any) {
      const token = useAuthStore().token;
      const response = await fetch(`${BASE_URL}/hotel/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(hotel),
      });
      if(response.status == 200) {
        return true;
      } else {
        return false;
      }
    },
  },
});
