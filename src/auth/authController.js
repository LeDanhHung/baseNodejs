import AuthData from "./authData.js";
import { sendMail } from "./authMailler.js"
import bcrypt from 'bcrypt'
import ERROS from "../errors/erros.js";
const err = new ERROS();


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
                return err.wrongUsernameOrPassword()
            }
            const compare = await bcrypt.compare(data.password, read.password)
            if (compare == true) {
                return read
            }
            return err.wrongUsernameOrPassword()
        }
        if (data.email) {
            const doc = await authData.findOne({ email: data.email })
            if (!doc) {
                return err.wrongEmail()
            }
            const compare = await bcrypt.compare(data.password, doc.password)
            if (compare == true) {
                return doc
            }
            return err.wrongUsernameOrPassword()
        }
    }
}
export default AuthController