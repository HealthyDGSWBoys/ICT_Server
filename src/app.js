import express from 'express'
import cors from 'cors'
import http from 'http'
import mainRouter from './routers/mainRouter'

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', mainRouter)

export default server
