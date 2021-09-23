import verifySchema from "./verifyModel.js";
import { STATUS } from './verifyModel.js'
class verifyData {
    async find(email) {
        const read = await verifySchema.findOne({ email })
        return read
    }
    async findAll() {
        const read = await verifySchema.find()
        return read
    }
    async create(obj) {
        const read = await verifySchema.create(obj)
        return read
    }
    async delete(email) {
        await verifySchema.deleteOne({ email })
    }
    async update(email) {
        const read = await verifySchema.updateOne({ email }, { $set: { status: STATUS.TRUE } })
        return read
    }
}
export default verifyData