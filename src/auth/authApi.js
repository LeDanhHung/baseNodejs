import express from 'express'
import { register, login } from './authJoi.js'
import AuthService from './authController.js';
import jwt from 'jsonwebtoken'
import sessionService from '../sessions/sessionsController.js';
import { Auth } from './authMiddleware.js';
import { HTTP_STATUS } from '../errors/http-status.js';
const service = new AuthService;
const session = new sessionService;
const app = express();
app.use(express())

app.post('/dangki', async(req, res, next) => {
    try {
        const data = req.body
        const validate = register.validate(data)
        if (validate.error) {
            validate.error.code = HTTP_STATUS.BAD_REQUEST
            next(res.send(validate.error))

        }
        const { repeat_password, ...newData } = data;
        const read = await service.register(newData)
        if (read._id) {
            res.json("Register successful, Please check your Email to verify")
        }
    } catch (err) {
        throw err
    }
})
app.post('/dangnhap', async(req, res, next) => {
    try {
        const data = req.body
        const validate = login.validate(data)
        if (validate.error) {
            validate.error.code = HTTP_STATUS.BAD_REQUEST
            next(res.send(validate.error))
        }
        const read = await service.login(data)
        if (read.username) {
            const token = jwt.sign({ id: read.id, username: read.username, email: read.email, status: read.status }, process.env.JWT_SECRET)
            await session.create({ userId: read.id, jwt: token })
            res.json(token)
        } else res.json(read)
    } catch (err) {
        throw err
    }
})
app.post('/dangxuat', async(req, res) => {
    const token = req.headers.token
    const decode = jwt.decode(token, process.env.JWT_SECRET)
    const doc = await session.destroy(decode.id)
    res.json(doc)
})
app.get('/testAuth', Auth, async(req, res) => {
    res.json("thành công")
})
app.get('/success', async(req, res) => {
    res.json("Da xac nhan Email")
})
app.get('/verification/:email', async(req, res) => {
    const email = req.params.email
    await service.verify(email)
    res.redirect('/auth/success')
})


export default app