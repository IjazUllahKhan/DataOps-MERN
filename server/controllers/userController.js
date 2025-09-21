import User from "../models/userModel.js";
import moment from "moment/moment.js";
import fs from "node:fs";
import csv from "fast-csv";

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
  const search = req.query.search || "";
  const gender = req.query.gender || "";
  const status = req.query.status || "";
  const sort = req.query.sort || "";
  const page = req.query.page || 1;
  const usersPerPage = 3;

  const skip = (page - 1) * usersPerPage;

  const query = {
    firstName: { $regex: search, $options: "i" },
  };
  if (gender != "All") {
    query.gender = gender;
  }
  if (status != "All") {
    query.status = status;
  }
  try {
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    const users = await User.find(query)
      .sort({
        dateCreated: sort == "new" ? -1 : 1,
      })
      .skip(skip)
      .limit(usersPerPage);
    if (users.length > 0) {
      return res.status(200).json({
        pagination: {
          totalPages,
        },
        users,
      });
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

const statusController = async (req, res) => {
  const { id } = req.params;
  const status = req.body.status;
  try {
    const response = await User.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Csv export controller

const csvExportController = async (req, res) => {
  try {
    const usersData = await User.find();
    if (usersData.length > 0) {
      if (!fs.existsSync("./public/exports")) {
        if (!fs.existsSync("./public")) {
          fs.mkdirSync("./public");
        }
        if (!fs.existsSync("./public/exports")) {
          fs.mkdirSync("./public/exports");
        }
      }

      const csvStream = csv.format({ headers: true });
      const fileStream = fs.createWriteStream("./public/exports/export.csv");
      csvStream.pipe(fileStream);

      csvStream.on("finish", () => {
        return res.json({
          downloadUrl: "http://localhost:7000/public/export.csv",
        });
      });

      usersData.map((user) => {
        csvStream.write({
          FirstName: user.firstName || "-",
          LastName: user.lastName || "-",
          Email: user.email || "-",
          Mobile: user.mobile || "-",
          Location: user.location || "-",
          Gender: user.gender || "-",
          Status: user.status || "-",
          ProfileImage: user.profileImg || "-",
          DateCreated: user.dateCreated || "-",
          DateUpdated: user.dateUpdated || "-",
        });
      });
      fileStream.close();
      csvStream.end();
    } else {
      return res.status(404).json({ msg: "NO user found" });
    }
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
  statusController,
  csvExportController,
};
