import { expiredHrs } from '../maths/time.js'
import sessionsData from './sessionsData.js'
const session = new sessionsData
class sessionService {
    async create(data) {
        data.expiresAt = expiredHrs(3)
        await session.create(data)
    }
    async find(id) {
        const read = await session.find(id)
        return read
    }
    async findAll() {
        const read = await session.findAll()
        return read
    }
    async destroy(id) {
        const read = await session.destroy({ userId: id })
        if (read.deletedCount == 1) {
            return "Logged Out"
        } else {
            return "Failed to loggout"
        }
    }
    async update(data) {
        const read = await session.update(data);
        return read
    }
    async delete(id) {
        return await session.destroy({ userId: id })
    }
    async findExpired() {
        const read = await this.findAll()
        const filter = read.filter((reads) => {
            return new Date(reads.expiresAt).getTime() < Date.now()
        })
        return filter
    }
}
export default sessionService