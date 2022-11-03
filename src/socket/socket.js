import {Server} from 'socket.io'
export default class WebSocketServer {
    constructor (
        server
    ) {
        this.io = new Server(server, {
            path: '/socket.io',
            transports: ['websocket'],
        })
        this.sockets = new Array()
        this.io.on('connection', (socket) => {
            socket.on("login", (data) =>  {
                socket.name = data.name
                this.sockets.push(socket)
                socket.emit("onconnect", {users: this.sockets.map((socket) => { return {name: socket.name}})})
                socket.broadcast.emit("join", {name: socket.name})
            })
            socket.on('control', (control) => {
                socket.broadcast.emit('control', { ...control, name: socket.name })
            })
            socket.on('sync', (movement) => {
                socket.broadcast.emit('sync', { ...movement, name: socket.name })
            })
            socket.on('disconnect', () => {
                for(let i = 0; i < this.sockets.length; i++) {
                    if(this.sockets[i].name === socket.name) {
                        this.sockets.splice(i, 1)
                        i++
                    }
                }
                socket.broadcast.emit("out", {name: socket.name})
            })
        })
    }
}
