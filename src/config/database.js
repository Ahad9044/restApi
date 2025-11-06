import mongoose from 'mongoose'

export const connectDb = async () => {
    return mongoose.connect('mongodb+srv://xys2376:Qwerty1234@practisecluster.4ordkpu.mongodb.net/?appName=practiseCluster');
}

connectDb().then(() => {
    console.log("Connection to the database Successful");

}).catch((err) => {
    console.log("Can't Connect to the db!!");
})
