import express from 'express'
import { modelExpo } from './models/user.js';
import { connectDb } from './config/database.js';
import profileRouter from './router/profile.js';
import authRouter from './router/authRouter.js';

import cookieParser from 'cookie-parser';

import { auth } from './middleware/auth.js';


const PORT = 2222
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/", authRouter)
app.use("/" , profileRouter)


app.patch("/profile", async (req, res) => {
    const user = req.body
    try {
        const updated = await modelExpo.findByIdAndUpdate(user._id, user, { new: true })
        res.send(updated)
    } catch (err) {
        res.status(40).send("SOmething went wrong :" + err.message);
    }
})


app.get("/profilee", auth, async (req, res) => {
    try {
        // req.user= user
        res.send(req.user)
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