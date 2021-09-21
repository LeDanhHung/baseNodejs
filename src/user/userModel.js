import Mongoose from "mongoose";
import bcrypt from 'bcrypt'
export const STATUS = {
    TRUE: 'ok',
    FALSE: 'Chưa xác nhận'
}
const UsersSchema = Mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
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
            default: STATUS.FALSE
        }
    })
    // mã hóa pass
UsersSchema.pre('save', async function(next) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash
        next()
    })
    // cập nhật pass 
UsersSchema.pre('updateOne', async function(next) {
    if (this._update.$set.password) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(this._update.$set.password, salt);
        this._update.$set.password = hash
        next()
    }
    next()
})
export default Mongoose.model('users', UsersSchema)