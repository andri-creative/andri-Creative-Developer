// client/socket.ts
import { io } from "socket.io-client";

const token = localStorage.getItem("token");

export const socket = io("http://localhost:4050", {
  auth: { token },
  transports: ["websocket"],
});
