import AlbumData from "./albumData.js"
const data = new AlbumData
class albumController {
    async create(obj) {
        const doc = await data.create(obj)
        return doc
    }
    async findOne(id) {
        const doc = await data.findOne(id)
        return doc
    }
    async find() {
        const docs = await data.find({ status: "Public" })
        return docs
    }
    async updateOne(id, obj) {
        const doc = await data.updateOne(id, obj)
        return doc
    }
    async delete(id) {
        const doc = await data.delete(id)
        return doc
    }
}
export default albumController