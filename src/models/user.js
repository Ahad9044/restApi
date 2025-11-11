import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    requied: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required : true
  },
  age: {
    type: Number,
    requied: true
  },
  emailId: {
    type: String,
    requied: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  about: {
    type: String,
    default: "Hii ! I am good"
  },
  photoUrl: {
    type: String,
    default: function () {
      if (this.gender === "male") {
        return "https://cdn-icons-png.flaticon.com/512/147/147144.png";
      } else if (this.gender === "female") {
        return "https://cdn-icons-png.flaticon.com/512/2922/2922561.png";
      } else {
        return "https://www.vhv.rs/dpng/d/488-4880035_whatsapp-unknown-dp-hd-png-download.png";
      }
    }

  }
});

export const modelExpo = mongoose.model('Blog', userSchema);