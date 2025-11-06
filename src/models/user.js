import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
   firstName : {
    type : String,
    requied : true
   },
   lastName : {
    type : String,
    requied : true
   },
   age : {
    type : Number ,
     requied : true
   } , 
   emailId : {
    type : String,
     requied : true
   } , 
   gender : {
    type : String,
    required : true
   }

    
});

export const modelExpo = mongoose.model('Blog', userSchema);