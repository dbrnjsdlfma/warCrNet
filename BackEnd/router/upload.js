const express = require('express')
const expressAsyncHandler = require('express-async-handler')

const User = require('../models/User')
const UploadData = require('../models/uploads')
const { Types : { ObjectId } } = require('mongoose');

const { isAuth } = require('../auth')
const router = express.Router()

const http = require('http')
const fs = require('fs')
fs.readdir('uploads', (err) => {
    if(err) {
        fs.mkdirSync('uploads')
        console.log('uploads 폴더를 생성했습니다.')
    } else {
        console.log('uploads 폴더가 있습니다.')
    }
})

const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, 'uploads/')
    } ,
    filename : function(req, file, cb) {
        const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        cb(null, originalname)
    }
})
const upload = multer({
    dest : 'uploads' ,
    storage : storage , 
})
router.get('/', isAuth, expressAsyncHandler( async(req, res, next) => {
    const user_id = req.user._id
    const imageFile = await UploadData.find({
        userId : user_id ,
    }).sort({ date : -1}).limit(1)
    if(imageFile.length === 0) {
        res.status(500).json({code : 500 , message : '설정한 이미지가 없습니다.'})
    } else {
        const imageFileUrl = imageFile[0].path
        const imageFileType = imageFile[0].minetype
        fs.readFile(imageFileUrl, (err, data) => {
            if(err) {
                console.log(err)
            } else {
                const ImageData = data.toString('base64')
                res.status(200).json({ code : 200 , ImageData, imageFileType})
            }
        })
    }
}))

router.put('/', upload.single('img') , isAuth , expressAsyncHandler( async(req, res, next) => { 
    const filename = `${req.file.filename} + ${Date()}`
    const uploadData = new UploadData({
        filename : filename ,
        path : req.file.path ,
        minetype : req.file.mimetype ,
        size : req.file.size ,
        date : new Date(),
        userId : req.user._id ,
    })
    const saveUpload = await uploadData.save()
    if(!saveUpload) {
        res.status(401).json({ code : 401 , message : 'Failed File Save'})
    } else {
        res.status(200).json({ code : 200 , message : 'Success File Save'})
    }
}))

module.exports = router