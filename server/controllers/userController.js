import User from "../models/userModel.js";
import moment from "moment/moment.js";

const userRegisterationController = async (req, res) => {
  const file = req.file.filename;
  const { firstName, lastName, email, mobile, location, gender, status } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !mobile ||
    !location ||
    !gender ||
    !status ||
    !file
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const preUser = await User.findOne({ email: email });

    if (preUser) {
      return res.status(409).json({ message: "This email is already used" });
    }

    const userData = new User({
      firstName,
      lastName,
      email,
      mobile,
      location,
      gender,
      status,
      profileImg: file,
      dateCreated: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    await userData.save();
    res.status(201).json({ message: "User registered successfully", userData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const allUserController = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const singleUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await User.findOne({ _id: id });
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const userEditController = async (req, res) => {
  let file;
  const { id } = req.params;
  if (req.file) {
    file = req.file.filename;
  } else {
    file = req.body.profileImg;
  }
  const { firstName, lastName, email, mobile, location, gender, status } =
    req.body;

  const dateUpdated = moment().format("YYYY-MM-DD HH:mm:ss");

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        firstName,
        lastName,
        email,
        mobile,
        location,
        gender,
        status,
        profileImg: file,
        dateUpdated,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const userDeleteController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  userRegisterationController,
  allUserController,
  singleUserController,
  userEditController,
  userDeleteController,
};
