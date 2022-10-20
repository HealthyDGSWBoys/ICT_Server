// import express from "express";
// import http from "http";
// import { parse } from "path";
// import WebSocket from "ws";

// const app = express();

// app.set("view engine", "pug");
// app.set("views", "./views");
// app.use("/public", express.static("./public"));
// app.get("/", (_, res) => res.render("home"));
// app.get("/*", (_, res) => res.redirect("/"));

// const server = http.createServer(app); //서버 접근 (http 서버) express
// const wss = new WebSocket.Server({ server }); // http 서버 위에 서버 생성 (Ws 서버) wabsocat

// const handleListen = () => console.log(`on http://localhost:3000`);
// // const handleListen = () => console.log(`Listening on ws://localhost:3000`);

// const sockets = []; //연결 수 확인

// wss.on("connection", (socket) => { //'접속해야 실행'
//     sockets.push(socket); //연결 되면 sockets안에 값 넣음
//     socket["nickname"] = "Anon" //닉네임 미정시 = 익명
//     console.log(socket); //소켓 저장
//     socket.on("close", ()=> console.log("bye"));
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         switch(message.type){ //메세지 2 type으로 나뉨
//             case "new_message": //메세지 일경우
//                 socket.forEach((aSocket)=> aSocket.send(`${socket.nickname}:${message.payload}`));
//             case "nickname": //닉네임 일경우
//                 socket["nickname"] = message.payload; //닉네임 저장
//         }
//         sockets.forEach((aSocket) => aSocket.send(message));
//         socket.send(message);
//     });
//     socket.send("socket connection-!");
// }); //웹 소켓 연결
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
let user = []

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

io.on('connection', (socket) => {
    console.log("connect")
    socket.emit("test", "ASDSDAS")
    socket.on('disconnect', () => {
        console.log("disconnect")
    })
})

const port = 8400
server.listen(port, () => {
  console.log(`port : ${port}`)
})

export default app