import usersSchema from "./userModel.js";
class UserData {
    async findUserId(id) {
        const read = await usersSchema.findById(id)
        return read
    }
    async updateInfo(id, data) {
        const read = await usersSchema.updateOne(id, { $set: data })
        return read
    }
    async changePass(id, pass) {
        const read = await usersSchema.updateOne(id, { $set: pass })
        return read
    }
    async findUser(email) {
        const read = await usersSchema.findOne(email)
        return read
    }
}
export default UserData