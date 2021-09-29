import userAlbumModel from './userAlbumModel.js'
class userAlbumData {
    async create(obj) {
        const read = await userAlbumModel.create(obj)
        return read
    }
    async findMine(id) {
        const read = await userAlbumModel.find(id)
        return read
    }
    async find(any) {
        const read = await userAlbumModel.findOne(any)
        return read
    }
    async delete(id) {
        const read = await userAlbumModel.deleteOne(id)
        return read
    }
}
export default userAlbumData