import express from 'express'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

// import user
import user from './src/user/userApi.js';
import userServices from './src/user/userController.js';
import { changePass, forgot } from './src//user/userJoi.js'
// import Auth
import auth from './src/auth/authApi.js';
import { mailForgotPassword } from './src/auth/authMailler.js'

import { randomCode } from './src/maths/randomCode.js'
import verifyServices from './src/verify/verifyController.js';
import { expiredMins } from './src/maths/time.js'
import { HTTP_STATUS } from './src/errors/http-status.js';
import sessionService from './src/sessions/sessionsController.js'
// configs
import connectDatabase from "./src/configs/dbConfigs.js";
dotenv.config()
connectDatabase();
const app = express();
app.use(express())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const userService = new userServices
const verifyService = new verifyServices
const session = new sessionService

app.get("/home", async(req, res) => {
    res.json("Trang chủ ")

})
app.get('/quenmatkhau', async(req, res, next) => {
    try {
        const email = req.body.email
        const validate = forgot.validate({ email })
        if (validate.error) {
            validate.error.code = HTTP_STATUS.UNAUTHORIZED
            next(validate.error)
        }
        const checkUser = await userService.findUser({ email })
        if (checkUser.email) {
            const code = randomCode() // random ma code 
            await mailForgotPassword(code, checkUser.email)
            await verifyService.create({ code, email: checkUser.email, expiredAt: expiredMins(4) })
            res.json("Check code tại email của bạn")
        } else {
            res.json(checkUser)
        }
    } catch (err) {
        next(err)
    }
})
app.get('/re/:email', async(req, res, next) => {
    try {
        const email = req.params.email
        const decoded = jwt.decode(email, process.env.JWT_SECRET)
        const code = req.body.code
        const find = await verifyService.findAndUpdate(decoded, code)
        if (find.modifiedCount == 1 || find.matchedCount == 1) {
            res.json(`localhost:4444/re/changepass/${email}`)
        }
    } catch (err) {
        next(err)
    }
})
app.get('/re/changepass/:email', async(req, res, next) => {
        const email = req.params.email
        const data = req.body
        const validate = changePass.validate(data)
        if (validate.error) {
            validate.error.code = HTTP_STATUS.UNAUTHORIZED
            next(validate.error)
        }
        const { repeat_password, ...newData } = data
        const decoded = jwt.decode(email, process.env.JWT_SECRET)
        const check = await verifyService.find(decoded)
        if (check.status) {
            const forgot = await userService.forgotPass(decoded, newData)
            if (forgot.modifiedCount == 1 || forgot.matchedCount == 1) {
                await verifyService.delete(decoded)
                res.json("Đổi mật khẩu thành công")
            }
        }

    })
    //Route
app.use('/auth', auth)
app.use('/user', user)

//Server
app.listen(process.env.port, async() => {
    console.log(`Server chạy bằng con port ${process.env.port}`);
})
export default app;