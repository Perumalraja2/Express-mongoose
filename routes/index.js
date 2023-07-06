const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { dbName, dbUrl } = require('../config/dbconfig')
const { UserModel } = require('../schema/userschema')

mongoose.connect(dbUrl)

router.get('/', async (req, res) => {

    try {

        let user = await UserModel.find({})

        res.status(200).send({
            message: "Data fetched scuccesfully ",
            user
        })


    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }

})

router.get('/:id', async (req, res) => {

    try {

        let data = await UserModel.findById(req.params.id)

        res.status(200).send({
            message: "Data fetched scuccesfully ",
            data
        })


    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }

})


router.post('/', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            let newUser = await UserModel.create(req.body)
            res.status(200).send({
                message: "Data Saved scuccesfully ",
            })
        }
        else {
            res.status(400).send({
                message: "user already exists"


            })

        }
    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }
})


router.put('/:id', async (req, res) => {

    try {


        let user = await UserModel.findById(req.params.id)
        if (user) {
            user.name = req.body.name
            user.email = req.body.email
            user.password = req.body.password
            await UserModel.Save()

        } else {
            res.status(500).send({
                message: "internal server error"
            })

        }


    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }

})

router.delete('/:id', async (req, res) => {

    try {


        let user = await UserModel.findByIdAndDelete(req.params.id)
        if (user) {
            res.status(200).send({
                message: "Data Deleted scuccesfully ",

            })
        } else {
            res.status(400).send({
                message: "Invalid user ",
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "internal server error"
        })
    }

})



module.exports = router