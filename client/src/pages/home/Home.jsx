import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { userContext, updateContext } from "../../contexts/userContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Tables from "../../components/Tables1/Tables";
import Spiner from "../../components/spiner/Spiner";
import { usersGetAPI, deleteUserAPI, csvExportAPI } from "../../services/apis";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./home.css";
const Home = () => {
  const [sort, setSort] = useState("new");
  const [status, setStatus] = useState("All");
  const [gender, setGender] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [deleteUser, setDeleteUser] = useState(null);
  const [showspin, setShowSpin] = useState(true);
  const { user, setUser } = useContext(userContext);
  const { updateUser, setUpdateUser } = useContext(updateContext);
  const [allUser, setAllUser] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const prevHandler = async () => {
    setPage(() => {
      if (page == 1) return page;
      return page - 1;
    });
  };

  const nextHandler = async () => {
    setPage(() => {
      if (page == totalPages) return page;
      return page + 1;
    });
  };

  const adduser = () => {
    navigate("/register");
  };

  const fetchData = async () => {
    try {
      const response = await usersGetAPI(
        searchInput,
        gender,
        status,
        sort,
        page
      );
      if (response.status == 200) {
        setAllUser(response.data.users);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setAllUser([]);
        console.log("Error while fetching users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserCall = async (id) => {
    try {
      const response = await deleteUserAPI(id);
      if (response.status == 200) {
        setDeleteUser(response.data);
        fetchData();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [searchInput, gender, status, sort, page]);

  const exportHandler = async () => {
    const response = await csvExportAPI();
    if (response.status == 200) {
      window.open(response.data.downloadUrl, "_blank");
    } else {
      toast("Error");
    }
  };

  return (
    <>
      {deleteUser && (
        <Alert
          variant="danger"
          onClose={() => setUser(null)}
          dismissible
          className="shadow-lg rounded-3"
        >
          <Alert.Heading>Deletion Successful 🎉</Alert.Heading>
          <p>
            <strong>{deleteUser.firstName}</strong> has been successfully
            deleted!
          </p>
        </Alert>
      )}

      {user && (
        <Alert
          variant="success"
          onClose={() => setUser(null)}
          dismissible
          className="shadow-lg rounded-3"
        >
          <Alert.Heading>Registration Successful 🎉</Alert.Heading>
          <p>
            <strong>{user.firstName}</strong> has been successfully added!
          </p>
        </Alert>
      )}

      {updateUser && (
        <Alert
          variant="primary"
          onClose={() => setUpdateUser(null)}
          dismissible
          className="shadow-lg rounded-3"
        >
          <Alert.Heading>Registration Successful 🎉</Alert.Heading>
          <p>
            <strong>{updateUser.firstName}</strong> has been successfully added!
          </p>
        </Alert>
      )}

      <div className="container-fluid">
        <div
          className="main_div"
          style={{ maxWidth: "1200px", margin: "auto" }}
        >
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Button variant="success" className="search_btn">
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={adduser}>
                {" "}
                <i className="fa-solid fa-plus"></i>&nbsp; Add User
              </Button>
            </div>
          </div>
          {/* export,gender,status */}

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className="export_btn" onClick={exportHandler}>
                Export To Csv
              </Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    defaultChecked
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"male"}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"female"}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* short by value */}
            <div className="filter_newold">
              <h3>Sort By Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i className="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setSort("new");
                    }}
                  >
                    New
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setSort("old");
                    }}
                  >
                    Old
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    defaultChecked
                    onClick={(e) => setStatus("All")}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"active"}
                    onClick={(e) => setStatus("active")}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"inActive"}
                    onClick={(e) => setStatus("inactive")}
                  />
                </div>
              </div>
            </div>
          </div>
          {showspin ? (
            <Spiner />
          ) : (
            <Tables
              fetchData={fetchData}
              deleteUserCall={deleteUserCall}
              users={allUser}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              nextHandler={nextHandler}
              prevHandler={prevHandler}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
