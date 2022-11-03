import express from 'express'
import cors from 'cors'
import http from 'http'
// import db from './db.js'

const app = express()
const server = http.createServer(app)

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


export default server