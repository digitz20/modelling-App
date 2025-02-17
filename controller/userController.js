const mongoose = require('mongoose')
const userModel = require('../models/user')
const fs = require('fs')



exports.createUser = async (req, res) => {
    try {
        const { fullName,email,password } = req.body


        const file = req.files.profileImage[0]

        console.log(file)

        const files = req.files.catalogs.map((e) => e.originalname)


        
        const userData = new userModel({
            fullName,
            email,
            password,
            profileImage: file.originalname,
            catalogs : files
        })


        await userData.save()
        
        res.status(201).json({message: 'user has been registered successfully', data: userData})

    } catch (error) {
        res.status(500).json({message: 'internal server error', error:error.message})
    }
}




exports.getAllUsers = async (req, res) => {
    try {
        
        const allUser = await userModel.find()

        res.status(200).json({message: 'kindly find below all registered users', data: allUser})
    } catch (error) {

        res.status(500).json({message: 'internal server error', error:error.message})
    }
}



exports.getOneUser = async (req, res) => {
    try {
        const {id} =req.params

        const user = await userModel.findById(id)

        if(!user) {
            return res.status(404).json({message: 'user not found'})
        }

        res.status(200).json({message: 'find below the registered user with the id', data: user})


    } catch (error) {
        res.status(500).json({message: 'internal server error', error:error.message})
    }
}





exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params

        const { fullName,email,password } = req.body

        const user = await userModel.findById(id)

        if(!user) {
            return res.status(404).json({message: ' user not found'})
        }

        const data = {
            fullName,
            email,
            password,
            profileImage: user.profileImage,
            catalogs: user.catalogs
        }

        const profilePicturePath = `./uploads/${user.profileImage}`

        if(req.files) {
            if(fs.existsSync(profilePicturePath)) {
                fs.unlinkSync(profilePicturePath)

                const file = req.files.profileImage

                data.profileImage = file.originalname
            }
        }

        const catalogPicturePath = user.catalogs.map((e) => { return `./uploads/${e}`})

       if(req.files) {
          catalogPicturePath.forEach((path) => {
            if(fs.existsSync(path)) {
                fs.unlinkSync(path)

                const files = req.files.catalogs.map((e) => e.originalname)

                data.catalogs = files
            }
          })
       }

       const updatedUser = await userModel.findByIdAndUpdate(id, data, {new: true})

       res.status(200).json({message: 'user has been updated successfully', data: updatedUser})


    } catch (error) {
        res.status(500).json({message: 'internal server error', error:error.message})
    }
}




exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params

        const user = await userModel.findById(id)

        if(!user) {
            return res.status(404).json({message: 'user not found'}) 
        }

        const deletedUser = await userModel.findByIdAndDelete(id)


        const profilePicturePath = `./uploads/${user.profileImage}`

        
        
        if(deletedUser) {
                if(fs.existsSync(profilePicturePath)) {
                    fs.unlinkSync(profilePicturePath)
                }  

        }
         
        const catalogPicturePath = user.catalogs.map((e) => { return `./uploads/${e}`})
            
        if(deletedUser)
        catalogPicturePath.forEach((path) => {
           if(fs.existsSync(path)) {
              fs.unlinkSync(path)
                                 
            }
         }) 
                        
        res.status(200).json({message: 'user has been deleted', data: deletedUser})

    } catch (error) {
        res.status(500).json({message: 'internal server error', error:error.message})
    }
}


