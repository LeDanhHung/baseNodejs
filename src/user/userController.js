import UserData from "./userData.js"
import ERROS from "../errors/erros.js";
const err = new ERROS();
const data = new UserData
class UserController {
    async findUserId(id) {
        const read = await data.findUserId({ _id: id })

        return read
    }
    async updateInfo(id, obj) {
        obj.updatedAt = new Date()
        const read = await data.updateInfo(id, obj)
        if (read.modifiedCount == 1) {
            return "Update thành công"
        }
        return err.duplicateValue()
    }
    async changePass(id, obj) {
        obj.updatedAt = new Date()
        const read = await data.changePass(id, obj)
        if (read.modifiedCount == 1) {
            return "đổi mật khẩu thành công"
        }
        return err.duplicateValue()

    }
    async forgotPass(email, pass) {
        const read = await data.changePass({ email }, pass)
        return read
    }
    async findUser(email) {
        const read = await data.findUser(email)
        if (read.email) {
            return read
        } else {
            return err.wrongEmail()
        }

    }
}
export default UserController