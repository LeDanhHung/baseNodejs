import jwt from 'jsonwebtoken'
import sessionService from '../sessions/sessionsController.js'
const session = new sessionService
import ERROS from "../errors/erros.js";
const err = new ERROS();
export async function Auth(req, res, next) {

    // check token chuyền vào headers 
    const token = req.headers.token
    if (!token || token == "") { next(err.invalidToken()) } // k có token truyền vào header
    const tokenDecode = jwt.decode(token, process.env.JWT_SECRET, (errors, result) => {
        if (errors) {
            next(err.failedSave())
        }
        return result
    })
    const read = await session.find(tokenDecode.id)
    if (!read) { res.json("please login") }
    if (token == read.jwt) {
        const docDecode = jwt.decode(read.jwt, process.env.JWT_SECRET, (errors, result) => {
            if (errors) {
                return (err.invalidToken())
            }
            return result
        })
        if (docDecode.status == "Xác nhận") {
            req.userId = read.userId;
            next();
        } else {
            res.json("Please verify your email first")
        }
    } else {
        next(err.invalidToken())
    }

}