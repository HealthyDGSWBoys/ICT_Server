import express from 'express'
import testRouter from './routers/testRouter'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/test', testRouter)

export default app
