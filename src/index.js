import express from 'express'


const PORT = 1111
const app = express()

// params 
app.get("/abc", 
    (req, res, next) => {
        console.log(req.params); // {}
        next(); // passes control to the next handler
    }, 
    (req, res) => {
        console.log(req.query); 
        res.send("hello2");
    }
);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})