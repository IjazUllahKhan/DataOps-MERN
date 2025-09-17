import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spiner from "../../components/spiner/Spiner";
import { useParams, useNavigate } from "react-router-dom";
import { singleUserGetAPI, updateUserAPI } from "../../services/apis";
import { BASE_URL } from "../../services/helper";
import { updateContext } from "../../contexts/userContext";

const Edit = () => {
  const { setUpdateUser } = useContext(updateContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showspin, setShowSpin] = useState(true);
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
  const [imgData, setImgData] = useState(null);
  const [preview, setPreview] = useState(null);

  const inputValueHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const statusHandler = (e) => {
    setStatus(e.value);
  };

  const profileImgHandler = (e) => {
    setImgData(null);
    setProfileImg(e.target.files[0]);
  };

  const getUser = async () => {
    const response = await singleUserGetAPI(id);
    console.log(response);
    setInputValue(response.data);
    setStatus(response.data.status);
    setImgData(response.data.profileImg);
  };

  useEffect(() => {
    getUser();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [id]);

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
    }

    const userData = new FormData(formRef.current);
    userData.append("profileImg", profileImg || imgData);
    const header = { "Content-Type": "multipart/form-data" };
    const response = await updateUserAPI(id, userData, header);
    if (response.status == 200) {
      setUpdateUser(response.data);
      navigate("/");
    }

    return toast.success("Profile Updated Successfully");
  };

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container my-4">
          <Card
            className="p-4 shadow-sm"
            style={{ maxWidth: "800px", margin: "auto" }}
          >
            <Card.Header className="text-center">
              <h4>Edit Your Profile</h4>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <img
                  src={imgData ? `${BASE_URL}/uploads/${imgData}` : preview}
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
                    defaultInputValue={status}
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="profileImg">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control type="file" onChange={profileImgHandler} />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Enter Your Location"
                    value={inputValue.location}
                    onChange={inputValueHandler}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Edit;
