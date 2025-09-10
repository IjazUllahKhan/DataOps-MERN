import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Profile = () => {
  // Placeholder data for demonstration; in a real app, this could come from props or API
  const profileData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    mobile: "123-456-7890",
    location: "New York, NY",
    gender: "male",
    status: "active",
    profileImg: "/avatar.jpg", // Fallback image; in a real app, this could be a URL from storage
  };

  return (
    <div className="container my-4">
      <Card
        className="p-4 shadow-sm"
        style={{ maxWidth: "800px", margin: "auto" }}
      >
        <Card.Header className="text-center">
          <h4>Your Profile</h4>
        </Card.Header>
        <Card.Body>
          <div className="text-center mb-4">
            <img
              src={profileData.profileImg}
              alt="Profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
          <Row>
            <Col lg={6} className="mb-3">
              <strong>First Name:</strong> {profileData.firstName}
            </Col>
            <Col lg={6} className="mb-3">
              <strong>Last Name:</strong> {profileData.lastName}
            </Col>
            <Col lg={6} className="mb-3">
              <strong>Email:</strong> {profileData.email}
            </Col>
            <Col lg={6} className="mb-3">
              <strong>Mobile:</strong> {profileData.mobile}
            </Col>
            <Col lg={6} className="mb-3">
              <strong>Gender:</strong>{" "}
              {profileData.gender.charAt(0).toUpperCase() +
                profileData.gender.slice(1)}
            </Col>
            <Col lg={6} className="mb-3">
              <strong>Status:</strong>{" "}
              {profileData.status.charAt(0).toUpperCase() +
                profileData.status.slice(1)}
            </Col>
            <Col lg={6} className="mb-3">
              <strong>Location:</strong> {profileData.location}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
