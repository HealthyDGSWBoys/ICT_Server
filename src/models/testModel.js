import db from '../db'
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