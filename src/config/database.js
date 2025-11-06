import mongoose from 'mongoose'

export const connectDb = async () => {
    return mongoose.connect('mongodb+srv://restApiUsername:Ahad1234@restapi.p2jwpyc.mongodb.net/?appName=restApi');
}

connectDb().then(() => {
    console.log("Connection to the database Successful");

}).catch((err) => {
    console.log("Can't Connect to the db!!");
})
