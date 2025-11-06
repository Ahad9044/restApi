import express from 'express'
import { auth } from './middleware/auth.js';
import { connectDb } from './config/database.js';


const PORT = 2222
const app = express()

app.use("/admin", auth)

app.get("/admin/data", (req, res) => {
    res.send("Sending data")
});

app.listen(PORT, () => {
    connectDb()
        .then(() => { console.log(`App is listening on port ${PORT}`); })

})