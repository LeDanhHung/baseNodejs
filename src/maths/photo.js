import multer from 'multer'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../testnodejs/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, name(file.originalname))
    }
})
export const upload = multer({ storage: storage })

export function name(str) {
    const newStr = "Photo_" + Math.floor(Math.random() * 1000000000) + "_" + `${str}`
    return newStr
}