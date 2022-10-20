// import "dotenv/config"
import app, {server} from "./app.js"
// import './socket/socket.js'
// import "./db"

// app.listen(process.env.PORT, () => {
//   console.log("✅ Server running...")
// })
const port = 8400
server.listen(port, (result) => {
  console.log(`✅ server running at ${port}`)
})
