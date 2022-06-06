import { UserExist, Login, Join } from '../models/Auth'

export const login = async (req, res) => {
    const { id, password } = req.body
    if(id && password) {
        if (await UserExist(id, password)) {
            const token = await Login(id, password)
            return res
            .status(200)
            .json({
                message: "Login Success",
                token
            })
        }
        else {
            return res
            .status(200)
            .json({
                message: "Login Failed"
            })
        }
    }
    else {
        return res
        .status(204)
        .json({
            message: "No Content"
        })
    }
}

export const join = async (req, res) => {
    const { id, password } = req.body
    const result = await Join(id, password)
    return res
    .status(result ? 201 : 409)
    .json({
        message: result ? "Join Success" : "Join Fail"
    })

}