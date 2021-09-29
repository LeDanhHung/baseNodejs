import express from 'express'
import { create, update } from './albumJoi.js'
import albumController from './albumController.js'
import photoController from '../photo/photoController.js'
import { Auth } from '../auth/authMiddleware.js'
import userAlbumController from '../userAlbum/userAlbumController.js'

const app = express()
const album = new albumController
const photo = new photoController
const userAlbum = new userAlbumController
app.use(Auth)
app.use(express())


app.get('/', async(req, res) => {
    res.json("album")
})
app.post('/create', async(req, res) => {
    const data = req.body
    const userId = req.userId
    const validate = create.validate(data)
    if (validate.error) {
        throw validate.error
    }
    const doc = await album.create(data)
    const doc1 = await userAlbum.create({ userId, albumId: doc._id })
    res.json(doc1)
})
app.get('/myalbum', async(req, res) => {
    const userId = req.userId
    const docs = await userAlbum.findMine({ userId })
    res.json(docs)
})
app.get('/myalbum/:id', async(req, res) => {
    const id = req.params.id
    const docs = await photo.findAlbum({ albumId: id })
    res.json(docs)
})
app.get('/getpublic', async(req, res) => {
    const docs = await album.find()
    res.json(docs)
})
app.post('/add/:id', async(req, res) => {
    const id = req.params.id
    const doc = await album.findOne({ _id: id })
    const photoId = req.body.photoId
    const userId = req.userId
    const doc1 = await photo.findOne({ userId }, { _id: photoId })
    const doc2 = await photo.update({ _id: doc1._id }, { updatedAt: Date.now(), albumId: doc._id })
    res.json(doc2)
})
app.post('/remove', async(req, res) => {
    const photoId = req.body.photoId
    const userId = req.userId
    const doc = await photo.findOne({ userId }, { _id: photoId })
    const doc1 = await photo.update({ _id: doc._id }, { updatedAt: Date.now(), albumId: "" })
    res.json(doc1)
})
app.post('/join/:id', async(req, res) => {
    const userId = req.userId
    const albumId = req.params.id
    const doc = await userAlbum.create({ userId, albumId })
    const doc1 = await album.findOne({ _id: doc.albumId })
    const doc2 = await album.create({ name: doc1.name, description: doc1.description })
    res.json(doc2)
})
app.post('/update/:id', async(req, res) => {
    const userId = req.userId
    const albumId = req.params.id
    const data = req.body
    data.updatedAt = Date.now()
    const validate = update.validate(data)
    if (validate.error) {
        throw validate.error
    }
    const doc = await userAlbum.find({ userId, albumId })
    const doc1 = await album.updateOne({ _id: doc.albumId }, data)
    res.json(doc1)

})
app.post('/delete/:id', async(req, res) => {
    const userId = req.userId
    const albumId = req.params.id
    const doc = await userAlbum.find({ userId, albumId })
    const doc1 = await album.delete({ _id: doc.albumId })
    const doc2 = await userAlbum.delete({ albumId })
    res.json(doc2)

})
export default app