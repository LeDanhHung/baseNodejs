import usersSchema from "../user/userModel.js"
import { STATUS } from "../user/userModel.js"
class AuthData {
    async register(data) {
        try {
            const read = await usersSchema.create(data)
            return read
        } catch (err) {
            throw err
        }
    }
    async findOne(any) {
        const read = await usersSchema.findOne(any)
        return read
    }
    async verify(email) {
        const read = await this.findOne({ email })
        await usersSchema.updateOne({ _id: read._id }, { $set: { status: STATUS.TRUE } })
    }
}
export default AuthData