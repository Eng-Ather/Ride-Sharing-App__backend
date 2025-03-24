
export default function SocketOnAndEmit(channel, payload) {
    socket.on(channel, (data) => {
      console.log(`Received on ${channel}:`, data);
      socket.emit(payload, data);
    });
  }