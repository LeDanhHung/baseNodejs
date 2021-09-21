import UserData from "./userData.js"
import APIError from "../errors/ApiErr.js"
import httpStatus from "http-status"
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
        const error = new APIError('update thất bại', httpStatus.UNAUTHORIZED, false)
        return error
    }
    async changePass(id, obj) {
        obj.updatedAt = new Date()
        const read = await data.changePass(id, obj)
        if (read.modifiedCount == 1) {
            return "đổi mật khẩu thành công"
        }
        const error = new APIError('Đổi mật khẩu thất bại', httpStatus.UNAUTHORIZED, false)
        return error

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
            const error = new APIError('Email không tồn tại', http.status.UNAUTHORIZED, false)
            return error
        }

    }
}
export default UserController