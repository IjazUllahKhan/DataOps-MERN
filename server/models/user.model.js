import mongoose from "mongoose";
import validator from "validator";

const userSChema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },

  mobile: {
    type: String,
    require: true,
    unique: true,
    minlength: 11,
    maxlength: 10,
  },

  location: {
    type: String,
    require: true,
  },

  gender: {
    type: String,
    require: true,
  },

  status: {
    type: String,
    require: true,
  },

  profileImg: {
    type: String,
    require: true,
  },
  dateCreated: Date,
  dateUpdated: Date,
});

const user = new mongoose.model("user", userSChema);

export default user;
