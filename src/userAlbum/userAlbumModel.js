import Mongoose from "mongoose";
const userAlbumSchema = Mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    albumId: {
        type: String,
        required: true
    }
})
export default Mongoose.model('userAlbum', userAlbumSchema)