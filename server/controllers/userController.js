import User from "../models/userModel.js";
import moment from "moment/moment.js";

const userRegisterationController = async (req, res) => {
  const file = req.file.filename;
  const {
    firstName,
    lastName,
    email,
    password,
    mobile,
    location,
    gender,
    status,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
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
    console.log(preUser);

    if (preUser) {
      return res.status(409).json({ message: "This email is already used" });
    }

    const userData = new User({
      firstName,
      lastName,
      email,
      password,
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

export { userRegisterationController };
