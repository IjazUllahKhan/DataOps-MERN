import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

const Register = () => {
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    location: "",
    gender: "",
  });

  const [status, setStatus] = useState("active");
  const [profileImg, setProfileImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const inputValueHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const statusHandler = (e) => {
    setStatus(e.value);
  };

  const profileImgHandler = (e) => {
    setProfileImg(e.target.files[0]);
  };

  useEffect(() => {
    if (profileImg) setPreview(URL.createObjectURL(profileImg));
  }, [profileImg]);

  const options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const formHandler = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, mobile, location, gender } = inputValue;
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      mobile === "" ||
      location === "" ||
      gender === ""
    ) {
      return toast.warning("Please fill all the fields");
    }
    return toast.success("Form Submitted Successfully");
  };

  return (
    <div className="container1">
      <h2 className=" text-center mt-1">Register Your Details</h2>
      <Card className="mt-3 p-3 shadow">
        <div className="  text-center mb-3">
          <img src={preview ? preview : "/avatar.jpg"} alt="avatar" />
        </div>
        <Form onSubmit={formHandler} className="row">
          <Form.Group className="mb-3 col-lg-6" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={inputValueHandler}
              name="firstName"
              type="text"
              placeholder="Enter First Name"
            />
          </Form.Group>

          <Form.Group className="mb-3 col-lg-6" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={inputValueHandler}
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
            />
          </Form.Group>

          <Form.Group className="mb-3 col-lg-6" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={inputValueHandler}
              name="email"
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3 col-lg-6" controlId="mobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              onChange={inputValueHandler}
              name="mobile"
              type="text"
              placeholder="Enter Mobile"
            />
          </Form.Group>

          <Form.Group className="mb-3 col-lg-6" controlId="gender">
            <Form.Label>Select Your Gender</Form.Label>
            <Form.Check
              onChange={inputValueHandler}
              type="radio"
              id="radio-1"
              label="Male"
              value="male"
              name="gender"
            />
            <Form.Check
              onChange={inputValueHandler}
              type="radio"
              id="radio-2"
              label="Female"
              name="gender"
              value="female"
            />
          </Form.Group>

          <Form.Group className="mb-3 col-lg-6" controlId="status">
            <Form.Label>Select Your Status</Form.Label>
            <Select onChange={statusHandler} options={options} />
          </Form.Group>

          <Form.Group className="mb-3 col-lg-6" controlId="profile">
            <Form.Label> Select Your Profile</Form.Label>
            <Form.Control onChange={profileImgHandler} type="file" />
          </Form.Group>

          <Form.Group className="mb-3 col-lg-6" controlId="location">
            <Form.Label>Enter Your Location</Form.Label>
            <Form.Control
              onChange={inputValueHandler}
              name="location"
              type="text"
              placeholder="Enter Your Location"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Register;
