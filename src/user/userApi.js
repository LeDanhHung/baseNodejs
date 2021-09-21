import express from "express"
import { Auth } from "../auth/authMiddleware.js"
import UserServices from "./userController.js"
import { update, changePass } from "./userJoi.js"
const service = new UserServices
const app = express()
app.use(express())
app.use(Auth)
app.get('/', async(req, res) => {
    const userId = req.userId;
    const read = await service.findUserId(userId)
    res.json(read)
})
app.post('/doimatkhau', async(req, res) => {
    try {
        const userId = req.userId;
        const data = req.body
        const validate = changePass.validate(data)
        if (validate.error) {
            throw validate.error
        }
        const { repeat_password, ...newData } = data
        const read = await service.changePass({ _id: userId }, newData)
        res.json(read)
    } catch (err) {
        res.json(err)
    }
})
app.post('/update', async(req, res) => {
    try {
        const userId = req.userId;
        const data = req.body
        const validate = update.validate(data)
        if (validate.error) {
            throw validate.error
        }
        const read = await service.updateInfo({ _id: userId }, data)
        res.json(read)
    } catch (err) {
        res.json(err)
    }
})
export default app