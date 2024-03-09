import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { BASE_URL } from "@/router/api";
import { ref } from "vue";

export interface Room {
  id: number;
  number: string;
  description: string;
  picture1: string;
  picture2: string;
  picture3: string;
  picture4: string;
  picture5: string;
  feature: {
    id: number;
    balcony: boolean;
    tv: boolean;
    roomService: boolean;
    airConditioning: boolean;
    wifi: boolean;
    heat: boolean;
    bathroom: boolean;
  };
  type: string;
}

const rooms = ref<Room[]>([]);
const singleRoom = ref<Room | null>(null);

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
    async loadAllRomms(id: any) {
      const token = useAuthStore().token;
      const response = await fetch(`${BASE_URL}/room/all/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        rooms.value = await response.json();
        return rooms.value;
      } else {
        const responseData = await response.json();
        console.log("Error", responseData);
        console.log(response.status);
        return false;
      }
    },
    async fetchRoomById(id: any) {
      const token = useAuthStore().token;
      const response = await fetch(`${BASE_URL}/room/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        singleRoom.value = (await response.json()) as Room;

        return singleRoom.value;
      } else {
        const responseData = await response.json();
        console.log("Error", responseData);
        console.log(response.status);
        return false;
      }
    },
    async roomUpdate(room: Room, id: any) {
      const token = useAuthStore().token;
      const response = await fetch(`${BASE_URL}/room/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(room),
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
