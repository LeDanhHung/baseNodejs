import Mongoose from "mongoose";
export const STATUS = {
    TRUE: "Xác nhận",
    FALSE: "Chưa xác nhận"
}
const verifySchema = Mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    expiredAt: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: STATUS,
        default: STATUS.FALSE
    }
})
export default Mongoose.model('verify', verifySchema)