import express from 'express'
import { modelExpo } from './models/user.js';
import { connectDb } from './config/database.js';
import validate from './utils/validate.js';
import bycrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'


const PORT = 2222
const app = express()
app.use(express.json())
app.use(cookieParser())

app.post("/signup", async (req, res) => {
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

app.get("/profile", async (req, res) => {
    try {
        const user = await modelExpo.findOne({ _id: req._id })
        if (user.length == 0) {
            res.send("No user found!!")
        } else {

            res.send(user)
        }
    } catch (err) {
        res.status(401).send("Something went wrong: " + err.message)
    }
})

app.patch("/profile", async (req, res) => {
    const user = req.body
    try {
        const updated = await modelExpo.findByIdAndUpdate(user._id, user, { new: true })
        res.send(updated)
    } catch (err) {
        res.status(40).send("SOmething went wrong :" + err.message);
    }
})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body
        const user = await modelExpo.findOne({ emailId })
        if (!user) {
            return res.status(401).send("No user found!")
        }
        else {

            const isPasswordValid = await bycrypt.compare(password, user.password)
            if (isPasswordValid) {
                let token = jwt.sign({ id: user._id }, "Ahad1234@")
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

app.get("/profilee", async (req, res) => {
    try {

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send("Unauthorised request")
        }
        const decoded = jwt.verify(token, "Ahad1234@")
        const user = await modelExpo.findOne({ _id: decoded.id })
        res.send(user)

    } catch (err) {
        console.error("Error in /profile route:", err);
        res.status(500).send("Something went wrong!");
    }
});



// app.delete("/profile", async)

app.listen(PORT, () => {
    connectDb()
        .then(() => {
            console.log(`App is listening on port ${PORT}`);
        })

})