import jwt from 'jsonwebtoken'
import sessionService from '../sessions/sessionsController.js'
const session = new sessionService
export async function Auth(req, res, next) {
    try {
        const token = req.headers.token
        if (!token || token == "") { res.json("plesase login") }
        const tokenDecode = jwt.decode(token, process.env.JWT_SECRET, (err, result) => {
            if (err) {
                throw err
            }
            return result
        })
        if (tokenDecode == undefined) { res.json("invalid token") }
        const read = await session.find(tokenDecode.id)
        if (!read) { res.json("please login") }
        if (token == read.jwt) {
            const docDecode = jwt.decode(read.jwt, process.env.JWT_SECRET, (err, result) => {
                if (err) {
                    throw err
                }
                return result
            })
            if (docDecode.status == "Verified") {
                req.userId = read.userId;
                next();
            } else {
                res.json("Please verify your email first")
            }
        } else {
            res.json("invalid token")
        }
    } catch (err) {
        throw err
    }
}