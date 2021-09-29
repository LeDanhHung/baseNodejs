import userAlbumData from "./userAlbumData.js"
const data = new userAlbumData
class userAlbumController {
    async create(obj) {
        const read = await data.create(obj)
        return read
    }
    async findMine(id) {
        const reads = await data.findMine(id)
        return reads
    }
    async find(any) {
        const read = await data.find(any)
        return read
    }
    async delete(id) {
        const read = await data.delete(id)
        return read
    }
}
export default userAlbumController