import { server } from "../app";
import { Server } from "socket.io";



console.log("ADSDA")
const io = new Server(server, {
    path: '/socket.io',
})
io.on('connection', (socket) => {
    console.log("ㅎㅇ")
    socket.on("test1", function(data) {
        console.log(data)
    })
    socket.on('disconnect', () => {
        console.log(socket)
    })
})
export default io