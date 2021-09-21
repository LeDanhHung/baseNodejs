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
app.get('/quenmatkhau', async(req, res) => {
    try {
        const email = req.body.email
        const validate = forgot.validate({ email })
        if (validate.error) {
            throw validate.error
        }
        const checkUser = await userService.findUser({ email })
        if (checkUser.email) {
            const code = randomCode()
            await mailForgotPassword(code, checkUser.email)
            await verifyService.create({ code, email: checkUser.email, expiredAt: expiredMins(2) })
            res.json("An email has been sent.")
        } else {
            res.json(checkUser)
        }
    } catch (err) {
        throw err
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