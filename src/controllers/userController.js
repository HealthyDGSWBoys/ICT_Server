import db from '../db'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
  const { id, password, name, birthday, email } = req.body

  try {
    db.query(`select * from User where id = '${id}'`, (err, result) => {
      if (err) console.error(err)

      if (result.length == 1)
        return res.status(400).json({
          status: 400,
          errMessage: '이미 존재하는 아이디 입니다.',
        })
    })

    db.query(
      `insert into User values ("${id}", "${password}", "${name}", "${birthday}", "${email}")`,
      (err, result) => {
        if (err) console.error(err)

        return res.status(201).json({
          status: 201,
          Message: '성공적으로 계정이 생성 되었습니다.',
        })
      }
    )
  } catch (err) {
    return res.status(500).json({
      status: 500,
      errMessage: '로그인 실패',
    })
  }
}

export const signin = async (req, res) => {
  const { id, password } = req.body

  try {
    db.query(`select * from User where id = '${id}'`, (err, result) => {
      if (err) console.error(err)

      if (result.length == 0)
        return res.status(400).json({
          status: 400,
          errMessage: '존재하지 않는 아이디 입니다.',
        })

      if (result[0].password !== password) {
        return res.status(400).json({
          status: 400,
          errMessage: '비밀번호가 옳지 않습니다.',
        })
      }

      const token = jwt.sign(
        {
          _id: id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
          issuer: 'sibal',
        }
      )
      return res.status(200).json({
        status: 200,
        message: '로그인 성공',
        token,
      })
    })
  } catch (err) {
    return res.status(500).json({
      status: 500,
      errMessage: '로그인 실패',
    })
  }
}

export const TokenTesting = (req, res) => {
  const { _id } = req.user

  db.query(`select * from User where id = '${_id}'`, (err, result) => {
    if (err) console.error(err)
    return res.status(200).json({
      code: 200,
      result,
    })
  })
}

export const idExist = (req, res) => {
  const id = req.params.id
  db.query(`select id from User where id = '${id}'`, (err, result) => {
    if (err) console.error(err)
    return res.status(200).json({
      code: 200,
      exist: result.length > 0,
    })
  })
}
