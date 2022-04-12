import React, { useState } from "react";
import { useTable } from "react-table";
import "./volunteerTable.css";

const VolunteerTable = () => {
  const data = React.useMemo(
    () => [
      {
        name: "some name",
        contact: "name@mail.com",
      },
      {
        name: "other name",
        contact: "other@mail.com",
      },
      {
        name: "pi",
        contact: "sss@mail.com",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
        getProps: () => {
          return {
            headerStyle: {
              color: "red",
            },
          };
        },
      },
      {
        Header: "Contact",
        accessor: "contact",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      style={{ boxShadow: "0 0 20px rgba(0,0,0,0.8)", background: "#CCDDBD" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderRight: "none",
                  background: "#576754",
                  color: "white",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
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
  );
};

export default VolunteerTable;
