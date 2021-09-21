import usersSchema from "../user/userModel.js"
import { STATUS } from "../user/userModel.js"
class AuthData {
    async register(data) {
        try {
            const doc = await usersSchema.create(data)
            return doc
        } catch (err) {
            throw err
        }
    }
    async findOne(any) {
        const doc = await usersSchema.findOne(any)
        return doc
    }
    async verify(email) {
        const doc = await this.findOne({ email })
        await usersSchema.updateOne({ _id: doc._id }, { $set: { status: STATUS.TRUE } })
    }
}
export default AuthData