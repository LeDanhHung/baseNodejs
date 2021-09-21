import sessionsSchema from "./sessionsModel.js";
class sessionData {
    async create(data) {
        const read = await sessionsSchema.create(data)
        return read
    }
    async find(id) {
        const read = await sessionsSchema.findOne({ userId: id })
        return read
    }
    async findAll() {
        const reads = await sessionsSchema.find()
        return reads
    }
    async destroy(id) {
        const read = await sessionsSchema.deleteOne(id);
        return read
    }
}
export default sessionData