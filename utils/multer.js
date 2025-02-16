const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null, true)
    }else {
        cb(new Error('invalid file type , please upload an image'))
    }
}

const limits = {
    limits: 1024 * 1024 * 70
}

const upload = multer({
    storage,
    fileFilter,
    limits
})

module.exports = upload








