// import express from 'express'
// import testRouter from './routers/testRouter'
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/test', testRouter)

// const socket = new WebSocket(`ws://${window.location.host}`); //서버로의 연결
// const messageList = document.querySelector("ul");
// const messageForm = document.querySelector("#message");
// const nickForm = document.querySelector("#nick");

// function mekeMessage(type, payload){
//     const msg = {type, payload}
//     return JSON.stringify(msg);
// }

// socket.on("open",()=>{ //open 이벤트 먼저
//     console.log("connection"); //이벤트 확인
// });
// socket.on("message", ()=> { //메세지 확인
//     const li = document.createElement("li");
//     li.innerText = message.daea;
//     messageList.append(li);
//     console.log("my message", message);//이벤트 확인;
// })
// socket.on("close", ()=>{ //접속 종료
//     console.log("bye"); //이벤트 확인
// })

// messageForm.on("submit", ()=> { 
//     event.preventDefault(); 
//     const input = messageForm.querySelector("input"); //
//     socket.send(mekeMessage("new_message", input.vlaue));  //메시지를 백엔드로 보냄
//     input.vlaue = ""; //확인 && 값 비움
// })

// nickForm.on("submit", ()=> {
//     event.preventDefault();
//     const input = nickForm.querySelector("input");
//     socket.send(mekeMessage("nickname", input.vlaue));
//     socket.send({
//         type:"nickname",
//         payload:input.value,
//     });
//     input.vlaue = ""; //값 비움
// })

// // setTimeout(() => {
// //     socket.send("hello~");
// // }, 10000)


// export default app


import express from 'express'
import session from 'express-session'
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  path: '/socket.io',
  transports: ['websocket'],
})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(
//   session({
//     secret: process.env.COOKIE_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
//     cookie: {},
//   })
// )
const sockets = []
io.on('connection', (socket) => {
    console.log
    socket.on("login", (data) =>  {
        socket.emit("onconnect", {users: sockets.map((socket) => socket.name)})
        socket.name = data.name
        sockets.push(socket)
    })
    socket.on('control', (control) => {
        socket.broadcast.emit('control', control)
        console.log(control)
    })
    socket.on('disconnect', () => {
        for(let i = 0; i < sockets.length; i++) {
            if(sockets[i].name === socket.name) {
                sockets.splice(i, 1)
                i++
            }
        }
        console.log(sockets.length)
    })
})

export default app
export {
    server
}