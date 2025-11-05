import express from 'express'
import { auth } from './middleware/auth.js';


const PORT = 1111
const app = express()

app.use("/admin", auth)

app.get("/admin/data", (req, res) => {
    res.send("Sending data")
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})