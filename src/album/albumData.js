import albumSchema from './albumModel.js'
class AlbumData {
    async create(obj) {
        const doc = await albumSchema.create(obj)
        return doc
    }
    async findOne(id) {
        const doc = await albumSchema.findById(id)
        return doc
    }
    async find(any) {
        const docs = await albumSchema.find(any)
        return docs
    }
    async updateOne(id, obj) {
        const doc = await albumSchema.updateOne({ _id: id }, { $set: obj })
        return doc
    }
    async delete(id) {
        const doc = await albumSchema.deleteOne(id)
        return doc
    }
}
export default AlbumData