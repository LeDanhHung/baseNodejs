import Mongoose from "mongoose";
const STATUS = {
    TRUE: "Public",
    FASLE: "Private"
}
const AlbumSchema = Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: STATUS,
        default: STATUS.FASLE
    }
})
export default Mongoose.model('Album', AlbumSchema)