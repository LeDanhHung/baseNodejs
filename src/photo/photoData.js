import photoModel from "./photoModel.js";
class photoData {
    async createOne(obj) {
        const read = await photoModel.create(obj)
        return read
    }
    async createMany(arr) {
        const read = await photoModel.insertMany(arr)
        return read
    }
    async findAll() {
        const reads = await photoModel.find()
        return reads
    }
    async findOne(id) {
        const read = await photoModel.findOne(id)
        return read
    }
    async update(id, obj) {
        const read = await photoModel.updateOne(id, { $set: obj })
        return read
    }
    async delete(id) {
        const read = await photoModel.deleteOne(id)
        return read
    }
    async findAlbum(id) {
        const reads = await photoModel.find(id)
        return reads
    }
}
export default photoData