import express from 'express'
import { register, login } from './authJoi.js'
import AuthService from './authController.js';
import jwt from 'jsonwebtoken'
import sessionService from '../sessions/sessionsController.js';
import { Auth } from './authMiddleware.js';
const service = new AuthService;
const session = new sessionService;
const app = express();
app.use(express())

app.post('/dangki', async(req, res) => {
    try {
        const data = req.body
        const validate = register.validate(data)
        if (validate.error) {
            throw validate.error
            res.json(validate.e)
        }
        const { repeat_password, ...newData } = data;
        const doc = await service.register(newData)
        if (doc._id) {
            res.json("Register successful, Please check your Email to verify")
        }
    } catch (err) {
        throw err
    }
})
app.post('/dangnhap', async(req, res) => {
    try {
        const data = req.body
        const validate = login.validate(data)
        if (validate.error) {
            throw validate.error
        }
        const read = await service.login(data)
        if (read.id) {
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
app.get('/test', Auth, async(req, res) => {
    res.json("test")
})
app.get('/success', async(req, res) => {
    res.json("Verified!")
})
app.get('/verification/:email', async(req, res) => {
    const email = req.params.email
    await service.verify(email)
    res.redirect('/auth/success')
})


export default app