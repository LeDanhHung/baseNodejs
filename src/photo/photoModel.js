import Mongoose from "mongoose";
const schema = Mongoose
const STATUS = {
    TRUE: "Public",
    FALSE: "Private"
}
const photoSchema = Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    albumId: {
        type: String,
    },
    link: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    updatedAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: STATUS,
        default: STATUS.TRUE,
        required: true
    }
})
export default Mongoose.model('photos', photoSchema)