import express from 'express'
import session from 'express-session'
import mainRouter from './routers/mainRouter'
import authRouter from './routers/authRouter'
import infoRouter from './routers/infoRouter'
import testRouter from './routers/testRouter'
import db from './db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {},
  })
)
app.use('/authenticate', mainRouter)
app.use('/test', testRouter)
app.use('/auth', authRouter)

export default app
