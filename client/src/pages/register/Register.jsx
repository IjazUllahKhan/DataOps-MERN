import React, { useEffect, useState, useRef, useContext } from "react";
import { userContext } from "../../contexts/userContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAPI } from "../../services/apis";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);
  const formRef = useRef(null);
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

  const formHandler = async (e) => {
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
    } else {
      const userData = new FormData(formRef.current);
      const header = { "Content-Type": "multipart/form-data" };
      const response = await registerAPI(userData, header);

      if (response.status === 201) {
        setInputValue({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          location: "",
        });
        setStatus("active");
        setProfileImg(null);
        setPreview(null);
        setUser(response.data.userData);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    }
  };

  return (
    <div className="container my-4">
      <Card
        className="p-4 shadow-sm"
        style={{ maxWidth: "800px", margin: "auto" }}
      >
        <Card.Header className="text-center">
          <h4>Register Your Details</h4>
        </Card.Header>
        <Card.Body>
          <div className="text-center mb-4">
            <img
              src={preview ? preview : "/avatar.jpg"}
              alt="Profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
          <Form ref={formRef} onSubmit={formHandler} className="row">
            <Form.Group className="mb-3 col-lg-6" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={inputValue.firstName}
                onChange={inputValueHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={inputValue.lastName}
                onChange={inputValueHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={inputValue.email}
                onChange={inputValueHandler}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="mobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                placeholder="Enter Mobile"
                value={inputValue.mobile}
                onChange={inputValueHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="gender">
              <Form.Label>Select Your Gender</Form.Label>
              <Form.Check
                type="radio"
                id="radio-1"
                label="Male"
                value="male"
                name="gender"
                checked={inputValue.gender === "male"}
                onChange={inputValueHandler}
              />
              <Form.Check
                type="radio"
                id="radio-2"
                label="Female"
                name="gender"
                value="female"
                checked={inputValue.gender === "female"}
                onChange={inputValueHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="status">
              <Form.Label>Select Your Status</Form.Label>
              <Select
                name="status"
                options={options}
                value={options.find((option) => option.value === status)}
                onChange={statusHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="profile">
              <Form.Label>Select Your Profile Picture</Form.Label>
              <Form.Control
                name="profileImg"
                type="file"
                onChange={profileImgHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="location">
              <Form.Label>Enter Your Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter Your Location"
                value={inputValue.location}
                onChange={inputValueHandler}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Register;
