import photoData from "./photoData.js";
const data = new photoData
class photoController {
    async createOne(obj) {
        const read = await data.createOne(obj)
        return read
    }
    async createMany(arr) {
        const read = await data.createMany(arr)
        return read
    }
    async findAll(page) {
        const read = await data.findAll()
        const itemPerPage = 5
        const slice = read.slice(itemPerPage * page - itemPerPage, itemPerPage * page)
        return slice;
    }
    async findAlbum(id) {
        const reads = await data.findAlbum(id)
        return reads
    }
    async findOne(id, uid) {
        const read = await data.findOne(id)
        if (!read) {
            return "NOT FOUND!"
        }
        if (read.status == "Private") {
            if (read.userId == uid) {
                return read
            } else {
                return "This image is current in private"
            }
        } else {
            return read
        }
    }
    async update(id, obj) {
        const read = await data.update(id, obj)
        return read
    }
    async delete(id) {
        const read = await data.delete()
        return read
    }
    async set(id) {
        const read = await this.findOne(id)
        if (read.id) {
            if (read.status == "Public") {
                const read1 = await this.update({ _id: doc.id }, { status: "Private" })
                return read1
            }
            if (doc.status == "Private") {
                const read2 = await this.update({ _id: doc.id }, { status: "Public" })
                return read2
            }
        } else return "not found"
    }
}
export default photoController