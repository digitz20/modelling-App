const router = require('express').Router()

const { createUser, getAllUsers, getOneUser , updateUser, deleteUser} = require('../controller/userController')

const upload = require('../utils/multer')

router.post('/register',  upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'catalogs', maxCount: 5 }]), createUser)

router.get('/users', getAllUsers)

router.get('/users/:id', getOneUser)

router.put('/users/:id', upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'catalogs', maxCount: 5 }]), updateUser)


router.delete('/users/:id', upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'catalogs', maxCount: 5 }]), deleteUser)



module.exports = router


