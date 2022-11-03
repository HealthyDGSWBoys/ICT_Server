import server from "./app.js"
import db from "./db.js"
import WebSocketServer from "./socket/socket.js"

db.connect((error) => {
  if(error) {
    console.log(error)
    console.log('❌ DB error')
  }
  else {
    console.log('✅ DB Connected')
  }
})

const port = process.env.PORT
server.listen(port, (result) => {
  console.log(`✅ server running at ${port}`)
  new WebSocketServer(server)
})