import express from 'express'
import { login, join } from '../controllers/authController'

const authRouter = express.Router()

authRouter.post('/login', login)
authRouter.post('/join', join)

export default authRouter
