import express from 'express'
import { modelExpo } from '../models/user.js'

const profileRouter = express.Router()

profileRouter.get("/profile", async (req, res) => {
    try {
        const user = await modelExpo.findOne({ _id: req._id })
        if (user.length == 0) {
            res.send("No user found!!")
        } else {

            // res.send(user)
        }
    } catch (err) {
        res.status(401).send("Something went wrong: " + err.message)
    }
})

export default profileRouter