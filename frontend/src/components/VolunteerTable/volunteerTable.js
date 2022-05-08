import React, { useState, useLayoutEffect, useEffect, useContext, useRef } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import "./volunteerTable.css";
import bgimage from "../../assets/garden.png";
import { Flex, Box, VStack, Spacer } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import {
  fetchData,
  deleteVolunteer,
  changeVolunteerStatus,
} from "../../dynoFuncs";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { GlobalContext } from "../../GlobalState";


import { volunteers } from "./vols"; // TODO: Remove
import { hours } from "./hours";
import { group } from "./group";


const VolunteerTable = () => {
  // const [data, setData] = useState();
  const [reloadPage, setReloadPage] = useState(0);
  const { currentUserInfo } = useContext(GlobalContext);

  // useEffect(() => {
  //   fetchData("volunteers_group").then((result) => setData(result));
  // }, [reloadPage]);

  // if (data && currentUserInfo.is_Admin === "True") {
  //   return (
  //     <Table
  //       data={data}
  //       reloadPage={reloadPage}
  //       setReloadPage={setReloadPage}
  //     />
  //   );
  // }
  // return <h2>You Do Not Have the Permissions to View This Page</h2>;


  const data = React.useMemo(
    () => volunteers,
    []
  )
  return (
    <Flex
      p={10}
      w="100%"
      bgImage={bgimage}
      bgPosition="center"
      bgSize="cover"
      bgRepeat="yes-repeat"
      overflow="auto"
    >
      <Table
        data={data}
        group={group}
        // reloadPage={reloadPage}
        // setReloadPage={setReloadPage}
      />
      <GroupTable
        data={group}
        // reloadPage={reloadPage}
        // setReloadPage={setReloadPage}
      />
    </Flex>
  )
};

const Table = (props) => {
  const { data, group } = props;
  console.log(data);
  const [openDelete, setDelete] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState();
  const [openStatus, setStatus] = React.useState(false);
  const [userToStatusChage, setUserToStatusChage] = React.useState();
  const [userStatus, setUserStatus] = React.useState("False");
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [loggedHours, setLoggedHours] = React.useState([]);
  const csvLog = useRef();
  const firstRender = useRef(true);

  const handleClickOpenDelete = (username) => {
    setUserToDelete(username);
    setDelete(true);
  };

  const handleClickOpenStatus = (username, status) => {
    setUserToStatusChage(username);
    setUserStatus(status);
    setStatus(true);
  };

  const handleDelete = async () => {
    console.log("IN handle delete");
    console.log("UserDel: " + userToDelete);
    deleteVolunteer(userToDelete, "volunteers_group");
    setDelete(false);
    props.setReloadPage(props.reloadPage + 1);
  };

  const handleStatusChange = async () => {
    changeVolunteerStatus(userToStatusChage, "volunteers_group", userStatus);
    setStatus(false);
    props.setReloadPage(props.reloadPage + 1);
  };

  const handleCancel = () => {
    setDelete(false);
    setStatus(false);
  };

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    // csvLog.current.link.click()
  }, [loggedHours])

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
        Cell: (row) => {
          return (
            <div>
              <span>
                {row.row.original["First Name"] +
                  " " +
                  row.row.original["Last Name"]}
              </span>
            </div>
          );
        },
      },
      {
        Header: "Email",
        accessor: "Email", //Email
      },
      {
        Header: "Role",
        accessor: "is_Admin",
        Cell: (row) => {
          if (row.row.original["is_Admin"] === "True") {
            return (
              <div>
                <p>Administration</p>
              </div>
            );
          } else {
            return (
              <div>
                <p>Volunteer</p>
              </div>
            );
          }
        },
      },
      {
        Header: "Change Status",
        accessor: "status",
        Cell: (row) => {
          if (row.row.original["is_Admin"] === "True") {
            return (
              <div>
                <button
                  onClick={() =>
                    handleClickOpenStatus(row.row.original["username"], "False")
                  }
                >
                  Revoke Admin Privledges 🔽
                </button>
              </div>
            );
          } else {
            return (
              <div>
                <div>
                  <button
                    onClick={() =>
                      handleClickOpenStatus(
                        row.row.original["username"],
                        "True"
                      )
                    }
                  >
                    Invoke Admin Privileges 🔼
                  </button>
                </div>
              </div>
            );
          }
        },
      },
      {
        Header: "Delete Volunteer",
        accessor: "Delete",
        Cell: (row) => {
          return (
            <div>
              <IconButton
                style={{ color: "#cee4bb" }}
                onClick={() =>
                  handleClickOpenDelete(row.row.original["username"])
                }
              >
                <DeleteIcon />
              </IconButton>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: "Name",
          },
        ],
      },
    },
    useSortBy,
    usePagination,
  );

  return (
    <div className="container">
      <Flex
        p={10}
        w="100%"
        bgImage={bgimage}
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        className="vol-table"
      >
        <VStack
          textAlign="center"
          marginRight="50px"
          spacing="20px"
        >
          <CSVLink data={data} filename="individual_volunteers" className="export">
            Export Individual Volunteers
          </CSVLink>
          <CSVLink data={group} filename="group_volunteers" className="export">
            Export Group Volunteers
          </CSVLink>
          <div className="date">
            <label style={{ background: "white", padding: "2px" }}>Start</label>
            <br />
            <input type="date" onChange={(e) => {
              setStartDate(e);
            }}/>
          </div>
          <div className="date" style={{ marginTop: "5px" }}>
            <label style={{ background: "white", padding: "2px" }}>End</label>
            <br />
            <input type="date" onChange={(e) => {
              setEndDate(e);
            }}/>
          </div>
          <button className="export" onClick={() => {
            if (!startDate || !endDate) {
              <span>Please select a start date and end date</span>
            } else {
              setLoggedHours(hours.filter((obj) => {
                return new Date(obj.date).getTime() >= startDate.target.valueAsNumber && new Date(obj.date).getTime() <= endDate.target.valueAsNumber
              }))
            }
          }}>Export Logged Hours</button>
          <CSVLink data={loggedHours} filename="logged_volunteer_data" className="hidden" ref={csvLog} target="_blank" />
        </VStack>
        <Box>
          <table
            {...getTableProps()}
            style={{
              boxShadow: "0 0 20px rgba(0,0,0,0.8)",
              background: "#CCDDBD",
              borderSpacing: "0 1em",
            }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        borderRight: "none",
                        background: "#576754",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                if (row.values.Email === "") return;
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            background: "#e6f2d9",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span> | </span>
            <span>
              Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ paddingLeft: "10px", width: "40px" }}
              />
            </span>{" "}
            <span
              value={15}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            />
          </div>
          <Dialog
            open={openDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete this volunteer?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action can't be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel} color="#CCDDBD">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="#CCDDBD" autoFocus>
                Delete Volunteer
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openStatus}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to change the status of this user?"}
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
              <DialogActions>
                <Button onClick={handleCancel} color="#CCDDBD">
                  Cancel
                </Button>
                <Button onClick={handleStatusChange} color="#CCDDBD" autoFocus>
                  Change User Status
                </Button>
              </DialogActions>
            </DialogActions>
          </Dialog>
        </Box>
      </Flex>
    </div>
  );
};

const GroupTable = (props) => {
  const { data } = props;
  console.log(data);
  const [openDelete, setDelete] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState();
  const [openStatus, setStatus] = React.useState(false);
  const [userToStatusChage, setUserToStatusChage] = React.useState();
  const [userStatus, setUserStatus] = React.useState("False");

  const handleClickOpenDelete = (username) => {
    setUserToDelete(username);
    setDelete(true);
  };

  const handleClickOpenStatus = (username, status) => {
    setUserToStatusChage(username);
    setUserStatus(status);
    setStatus(true);
  };

  const handleDelete = async () => {
    console.log("IN handle delete");
    console.log("UserDel: " + userToDelete);
    deleteVolunteer(userToDelete, "volunteers_group");
    setDelete(false);
    props.setReloadPage(props.reloadPage + 1);
  };

  const handleStatusChange = async () => {
    changeVolunteerStatus(userToStatusChage, "volunteers_group", userStatus);
    setStatus(false);
    props.setReloadPage(props.reloadPage + 1);
  };

  const handleCancel = () => {
    setDelete(false);
    setStatus(false);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Group Name",
        accessor: "groupName", // accessor is the "key" in the data
      },
      {
        Header: "Email",
        accessor: "emailContact", //Email
      },
      {
        Header: "Role",
        accessor: "is_Admin",
        Cell: (row) => {
          if (row.row.original["is_Admin"] === "True") {
            return (
              <div>
                <p>Administration</p>
              </div>
            );
          } else {
            return (
              <div>
                <p>Volunteer</p>
              </div>
            );
          }
        },
      },
      {
        Header: "Change Status",
        accessor: "status",
        Cell: (row) => {
          if (row.row.original["is_Admin"] === "True") {
            return (
              <div>
                <button
                  onClick={() =>
                    handleClickOpenStatus(row.row.original["username"], "False")
                  }
                >
                  Revoke Admin Privledges 🔽
                </button>
              </div>
            );
          } else {
            return (
              <div>
                <div>
                  <button
                    onClick={() =>
                      handleClickOpenStatus(
                        row.row.original["username"],
                        "True"
                      )
                    }
                  >
                    Invoke Admin Privileges 🔼
                  </button>
                </div>
              </div>
            );
          }
        },
      },
      {
        Header: "Delete Volunteer",
        accessor: "Delete",
        Cell: (row) => {
          return (
            <div>
              <IconButton
                style={{ color: "#cee4bb" }}
                onClick={() =>
                  handleClickOpenDelete(row.row.original["username"])
                }
              >
                <DeleteIcon />
              </IconButton>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: "Name",
          },
        ],
      },
    },
    useSortBy,
    usePagination,
  );

  return (
    <div className="container">
      <Flex
        p={10}
        w="100%"
        bgImage={bgimage}
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        className="vol-table"
      >
        <Box>
          <table
            {...getTableProps()}
            style={{
              boxShadow: "0 0 20px rgba(0,0,0,0.8)",
              background: "#CCDDBD",
              borderSpacing: "0 1em",
            }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        borderRight: "none",
                        background: "#576754",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                if (row.values.Email === "") return;
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            background: "#e6f2d9",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span> | </span>
            <span>
              Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ paddingLeft: "10px", width: "40px" }}
              />
            </span>{" "}
            <span
              value={15}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            />
          </div>
          <Dialog
            open={openDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete this volunteer?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action can't be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel} color="#CCDDBD">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="#CCDDBD" autoFocus>
                Delete Volunteer
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openStatus}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to change the status of this user?"}
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
              <DialogActions>
                <Button onClick={handleCancel} color="#CCDDBD">
                  Cancel
                </Button>
                <Button onClick={handleStatusChange} color="#CCDDBD" autoFocus>
                  Change User Status
                </Button>
              </DialogActions>
            </DialogActions>
          </Dialog>
        </Box>
      </Flex>
    </div>
  );
};

export default VolunteerTable;
