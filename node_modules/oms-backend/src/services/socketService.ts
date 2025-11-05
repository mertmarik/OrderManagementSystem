import { Server } from "socket.io";

export const socketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Order updates
    socket.on("join-order-room", (orderId: string) => {
      socket.join(`order-${orderId}`);
    });

    // Real-time notifications
    socket.on("join-user-room", (userId: string) => {
      socket.join(`user-${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
