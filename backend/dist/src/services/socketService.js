"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("join-order-room", (orderId) => {
            socket.join(`order-${orderId}`);
        });
        socket.on("join-user-room", (userId) => {
            socket.join(`user-${userId}`);
        });
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
exports.socketHandler = socketHandler;
//# sourceMappingURL=socketService.js.map