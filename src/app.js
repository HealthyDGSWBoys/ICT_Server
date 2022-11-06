import express from 'express'
import cors from 'cors'
import http from 'http'
import userRouter from './routers/mainRouter'
import testRouter from './routers/testRouter'

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRouter)
app.use('/test', testRouter)

export default server
