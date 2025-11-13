import express from 'express'
import validate from '../utils/validate.js';
import { modelExpo } from '../models/user.js';
import bycrypt from 'bcrypt'


const authRouter = express.Router()
authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password, age, gender } = req.body
        validate(firstName, lastName, emailId, password, age)
        const passwordHash = await bycrypt.hash(password, 10)
        const user = new modelExpo({ firstName, lastName, emailId, password: passwordHash, age, gender })
        await user.save()
        res.send("User Saved Successfully");
    } catch (err) {
        // Handle missing required fields (ValidationError)
        if (err.name === "ValidationError") {
            const missingFields = Object.keys(err.errors);
            return res.status(400).send({
                message: "Missing or invalid fields",
                details: missingFields.map(field => `${field} is required`),
            });
        }
        // Handle duplicate email (MongoServerError)
        if (err.code === 11000) {
            const duplicateKey = Object.keys(err.keyValue)[0];
            return res.status(409).send({
                message: `${duplicateKey} already exists`,
                value: err.keyValue[duplicateKey],
            });
        }

        // Generic fallback
        res.status(500).send({ message: "Something went wrong", error: err.message });
    }

})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body
        const user = await modelExpo.findOne({ emailId })
        if (!user) {
            return res.status(401).send("No user found!")
        }
        else {

            const isPasswordValid = await user.checkPassword(password)
            if (isPasswordValid) {
                let token = await user.getJWT()
                res.cookie("token", token)
                res.send("Login Successful !!")
            }
            else {
                return res.status(401).send("Password Incorrect!!")
            }
        }
    } catch (err) {
        res.status(401).send("Something went wrong! " + err)
    }
})

export default authRouter