import express from 'express'
import { 
  Test
} from '../controllers/testcontroller'

const router = express.Router()

router.post('/', Test)

export default router
