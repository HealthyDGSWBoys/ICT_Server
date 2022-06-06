import mysql from 'mysql'
import db from '../db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
export const UserList = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from user;", (err, result, fields) => {
            if(err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
}

export const UserExist = (id, password) => {
    return new Promise((resolve, reject) => {
        db.query(`select password from user where id='${id}';`, (err, result, fields) => {
            if(err) reject(err)
            else {
                resolve(bcrypt.compare(password, result[0].password))
            }
        })
    })
}   

export const Login = (id, password) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(
                jwt.sign({ id },
                process.env.JWT_SECRET, {
                    expiresIn: '1h',
                    issuer: 'WebServer',
                    algorithm: 'HS256'
                })
            )
        }
        catch (error) {
          console.error(error);
          reject(error)
        }
    })

}

export const Join = async (id, password) => {
    password = await bcrypt.hash(password, 10)
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO user(id, password) VALUES ('${id}', '${password}');`, (err, result, fields) => {
            if(err) resolve(false)
            else {
                resolve(true)
            }
        })
    })

}

export const logout = () => {

}