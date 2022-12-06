import db from "../db"

export const rankList = async(req,res) => {
    console.log(req.params.map)
    const _map = req.params.map
    db.query(`select * from RankTable where map = '${_map}'`, (err,result) => {
        if (err) console.error(err)

        console.log(result)
        return res.status(200).json({
            code:200,
            result
        })
    })
}

export const addRank = async(req,res) => {
    const {name,time,map} = req.body
    console.log("name",name)
    console.log("time",time)
    console.log("map",map)
        
        try{
    db.query(`insert into RankTable(name,time,map) value('${name}','${time}','${map}')`,(err,result) => {
        console.log(result)
            return res.status(201).json({
                status:201,
                Message: '성공적으로 등록했습니다',
            })
        }
        
    )}catch(err){
        return res.status(500).json({
            status: 500,
            errMessage: '기록 생성 실패',
        })
    }

}