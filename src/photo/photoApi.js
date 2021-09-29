import express from 'express'
import { upload } from '../maths/photo.js'
import { Auth } from '../auth/authMiddleware.js'
import photoController from './photoController.js'
import { page, photoUpdate } from './photoJoi.js'
const photo = new photoController
const app = express()
app.use(express())
app.use(Auth)

app.get('/', (req, res) => {
    res.json("photo")
})
app.get('/upload', (req, res) => {
    res.sendFile(`${process.cwd()}/src/photo/index.html`)
})
app.post('/upload', upload.single('photo'), async(req, res) => {
    if (req.file == undefined) {
        res.send('please input a photo')
    } else {
        const userId = req.userId
        const name = req.file.filename
        const link = req.file.path
        const data = { userId, name, link }
        await photo.createOne(data)
        res.send('Uploaded')
    }
})
app.post('/uploads', upload.array('photos'), async(req, res) => {
    if (req.files[0] == undefined) {
        res.send("Please input file")
    } else {
        const userId = req.userId
        const data = req.files.map((file) => {
            return { userId, name: file.originalname, link: file.path }
        })
        const doc = await photo.createMany(data)
        if (doc.length > 0) {
            res.send("Uploaded")
        } else {
            res.send("Failed to upload")
        }
    }
})
app.get('/all', async(req, res) => {
    let pageNo = req.query.page
    if (pageNo == undefined) {
        pageNo = 1
    }
    const validate = page.validate({ page: pageNo })
    if (validate.error) {
        throw validate.error
    }
    const docs = await photo.findAll(pageNo)
    res.json(docs)
})
app.get('/:id', async(req, res) => {
    const id = req.params.id
    const uid = req.userId
    const doc = await photo.findOne({ _id: id }, uid)
    res.json(doc)
})
app.post('/update/:id', async(req, res) => {
    const id = req.params.id
    const data = req.body
    data.updatedAt = Date.now()
    const validate = photoUpdate.validate(data)
    if (validate.error) {
        throw validate.error
    }
    const doc = await photo.findOne({ _id: id })
    if (doc) {
        const nameTail = sliceDot(doc.name)
        if (data.name) {
            data.name = name(data.name + nameTail)
        }
        const doc1 = await photo.update({ _id: id }, data)
        if (doc1.modifiedCount == 1) {
            res.json(doc1)
        }
    }
})
app.post('/set/:id', async(req, res) => {
    const id = req.params.id
    const doc = await photo.set({ _id: id })
    res.json(doc)
})
app.post('/delete/:id', async(req, res) => {
    const id = req.params.id
    const doc = await photo.delete({ _id: id })
    res.json(doc)
})
export default app