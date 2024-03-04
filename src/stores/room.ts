import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { BASE_URL } from "@/router/api";

export interface Room {
  id: number;
  number: string;
  description: string;
  picture1: string;
  picture2: string;
  picture3: string;
  picture4: string;
  picture5: string;
  features: {
    id: number;
    wifi: boolean;
    balcony: boolean;
    bathroom: boolean;
    tv: boolean;
    airConditioning: boolean;
    heat: boolean;
    roomService: boolean;
  };
  type: string;
}

export const useRoomStore = defineStore({
  id: "roomStore",
  actions: {
    async addRoom(
      id: any,
      number: string,
      description: string,
      picture1: string,
      picture2: string,
      picture3: string,
      picture4: string,
      picture5: string,
      wifi: boolean,
      balcony: boolean,
      bathroom: boolean,
      tv: boolean,
      airConditioning: boolean,
      heat: boolean,
      roomService: boolean,
      type: string
    ) {
      const token = useAuthStore().token;
      const response = await fetch(`${BASE_URL}/room/add/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number,
          description,
          picture1,
          picture2,
          picture3,
          picture4,
          picture5,
          wifi,
          balcony,
          bathroom,
          tv,
          airConditioning,
          heat,
          roomService,
          type,
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
