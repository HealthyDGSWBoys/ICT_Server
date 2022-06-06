import express from 'express'
import { protectedMiddleware } from '../middlewares'

const mainRouter = express.Router()

mainRouter.get('/test', protectedMiddleware ,async (req, res) => { 
  console.log(res.locals)
  console.log("test request")
  return res.status(200).json({
      code: 200,
      errorMessage: 'test request',
    })
 })

export default mainRouter
