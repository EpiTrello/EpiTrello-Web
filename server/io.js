export default function (socket, io) {
  return Object.freeze({
    join(id) {
      socket.join(id, () => { })
    },
    refresh(id) {
      socket.to(id).emit('refresh')
      socket.emit('refresh')
    }
  })
}