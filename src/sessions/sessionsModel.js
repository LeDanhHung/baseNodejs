import Mongoose from "mongoose";

const sessionsSchema = Mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    jwt: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
})
export default Mongoose.model('sessions', sessionsSchema)