import express from 'express'
import { signin, signup, TokenTesting, idExist} from '../controllers/userController'
import { authenticateAccessToken } from '../token/tokenMiddlewares'

const mainRouter = express.Router()

// 회원기입
mainRouter.post('/signup', signup)

// 로그인
mainRouter.post('/signin', signin)

// token 확인 샘플 코드
mainRouter.post('/decode', authenticateAccessToken, TokenTesting)

mainRouter.get('/idexist/:id', idExist)


export default mainRouter
