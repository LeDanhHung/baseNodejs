import AuthData from "./authData.js";
import { sendMail } from "./authMailler.js"
import bcrypt from 'bcrypt'
import APIError from "../errors/ApiErr.js"
import httpStatus from 'http-status'
const authData = new AuthData
class AuthController {
    async register(data) {

        const read = await authData.register(data)
        await sendMail(data.email)
        return read
    }
    async verify(email) {
        await authData.verify(email)
    }
    async login(data) {
        if (data.username) {
            const read = await authData.findOne({ username: data.username })
            if (!read) {
                const error = new APIError("Sai username", httpStatus.UNAUTHORIZED, false)
                return error
            }
            const compare = await bcrypt.compare(data.password, read.password)
            if (compare == true) {
                return read
            }
            const error = new APIError("Sai mật khẩu", httpStatus.UNAUTHORIZED, false)
            return error
        }
        if (data.email) {
            const doc = await authData.findOne({ email: data.email })
            if (!doc) {
                const error = new APIError('Sai email', httpStatus.UNAUTHORIZED, false)
                return error
            }
            const compare = await bcrypt.compare(data.password, doc.password)
            if (compare == true) {
                return doc
            }
            const error = new APIError('Sai mật khẩu', httpStatus.UNAUTHORIZED, false)
            return error
        }
    }
}
export default AuthController