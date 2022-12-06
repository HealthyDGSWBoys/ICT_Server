import express from 'express'
import {rankList,addRank} from "../controllers/rankController"

const rankRouter = express.Router()

// 이름, 시간(기록)
rankRouter.get('/ranklist/:map',rankList)
rankRouter.post('/addrank',addRank)

export default rankRouter