import db from "../db"

export const rankList = async(req,res) => {
    db.query(`select * from Rank`, (err,result) => {

    })
}

export const addRank = async(req,res) => {
    const {name,time} = req.body
    console.log("name",name)
    console.log("time",time)
    // db
}