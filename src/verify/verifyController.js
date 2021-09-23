import verifyData from "./verifyData.js";
const data = new verifyData
class verifyServices {
    async findAll() {
        const read = await data.findAll()
        return read
    }
    async find(email) {
        const read = await data.find(email)
        if (read.status == "Xác Nhận") {
            return read
        } else return "Vui lòng xác nhận email của bạn"
    }
    async findAndUpdate(email, code) {
        const read = await data.find(email)
        if (read.code == code) {
            const read = await data.update(email)
            return read
        } else {
            return " Sai mã code"
        }
    }
    async create(obj) {
        await data.create(obj)
    }
    async delete(email) {
        await data.delete(email)
    }
    async findExprired() {
        const read = await this.findAll()
        const filter = read.filter((doc) => {
            return new Date(doc.expiredAt).getTime() < Date.now()
        })
        return filter
    }
}
export default verifyServices