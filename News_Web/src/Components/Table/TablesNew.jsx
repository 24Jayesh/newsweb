import React from "react";
import "./Tables.css";

import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const TablesNew = ({userdata,deleteUser}) => {
  return (
    <>
      <div className="container m-3">
        <h1 className="text-center">ALL NEWS</h1>
        <Row>
          <div className="col m-3">
            <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>Title</th>
                    <th>Country Name</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((element, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{element.title}</td>
                            <td>{element.countryname}</td>
                            <td>{element.category}</td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="light"
                                  className="action"
                                  id="dropdown-basic"
                                >
                                  <i className="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    {/* <NavLink
                                      to={`/newsdetails/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        className="fa-solid fa-eye"
                                        style={{ color: "green" }}
                                      ></i>{" "}
                                      <span>View</span>
                                    </NavLink> */}
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/edit/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        className="fa-solid fa-pen-to-square"
                                        style={{ color: "blue" }}
                                      ></i>{" "}
                                      <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink className="text-decoration-none"
                                      onClick={() => deleteUser(element._id)}
                                    >
                                      <i
                                        className="fa-solid fa-trash"
                                        style={{ color: "red" }}
                                      ></i>{" "}
                                      <span>Delete</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <span className="no_data text-center">NO Data Found</span>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  );
};

export default TablesNew;
