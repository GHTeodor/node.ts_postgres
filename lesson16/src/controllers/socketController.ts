class SocketController {
    messageCreate(io: any, socket: any, data: any) {
        console.log(data);

        io.emit('message:get-all', { messages: [{ text: data.message }] });
    }

    joinRoom(io: any, socket: any, data: any) {
        socket.join(data.id);

        io.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined room ${data.id}` });
    }
}

export const socketController = new SocketController();
