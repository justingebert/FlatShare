import { Socket } from "socket.io";

module.exports = (io:any) => {
    io.on("connection", (socket:Socket) => {
        console.log("New client connected");
        socket.on("disconnect", () => console.log("Client disconnected"));
        socket.on("chat message", (msg:any) => {
            console.log("message: " + msg);
            io.emit("chat message", {
                content: msg.content
            });
        });
    });
};
