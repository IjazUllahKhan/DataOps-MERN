import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import Spiner from "../../components/spiner/Spiner";
import { singleUserGetAPI } from "../../services/apis";
import moment from "moment";

import { BASE_URL } from "../../services/helper";

const Profile = () => {
  const [showspin, setShowSpin] = useState(true);
  const { id } = useParams();
  const [user, setUser] = useState({});

  const getUser = async () => {
    const response = await singleUserGetAPI(id);
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [id]);

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
              <h4>Your Profile</h4>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <img
                  src={`${BASE_URL}/uploads/${user.profileImg}`}
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
                  <strong>First Name:</strong> {user.firstName}
                </Col>
                <Col lg={6} className="mb-3">
                  <strong>Last Name:</strong> {user.lastName}
                </Col>
                <Col lg={6} className="mb-3">
                  <strong>Email:</strong> {user.email}
                </Col>
                <Col lg={6} className="mb-3">
                  <strong>Mobile:</strong> {user.mobile}
                </Col>
                <Col lg={6} className="mb-3">
                  <strong>Gender:</strong>{" "}
                  {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                </Col>
                <Col lg={6} className="mb-3">
                  <strong>Status:</strong>{" "}
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Col>
                <Col lg={6} className="mb-3">
                  <strong>Location:</strong> {user.location}
                </Col>
                <Col lg={6} className="mb-3">
                  <strong>Created At:</strong>{" "}
                  {moment(user.dateCreated).format("DD-MM-YYYY")}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default Profile;
