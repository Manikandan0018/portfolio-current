let ioInstance;

export function initSocket(io) {
  ioInstance = io;

  io.on("connection", (socket) => {
    socket.on("join", (sessionId) => {
      socket.join(sessionId);
    });
  });
}

export function emitStatus(sessionId, msg) {
  if (!ioInstance) return;
  ioInstance.to(sessionId).emit("status", msg);
}
