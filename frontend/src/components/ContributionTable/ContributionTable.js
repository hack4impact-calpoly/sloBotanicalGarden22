import React from "react";
import "./ContributionTable.css";
import contributions from "./Data";

let totalHours = 0;
contributions.map((contribution) => (totalHours += contribution.hours));

const ContributionTable = () => {
  return (
    <div className="container">
      <h1 id="title">Your Contributions:</h1>
      {/* replace with numHours data */}
      <h1 id="numHours">{totalHours} Total Hours</h1>
      <table>
        <tr id="header">
          <th>Date</th>
          <th>Hours</th>
          <th>Description</th>
          <th>Supervisor</th>
        </tr>
        {contributions.map((contribution) => (
          <tr>
            <td>{contribution.date}</td>
            <td>{contribution.hours}</td>
            <td>{contribution.description}</td>
            <td>{contribution.supervisor}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ContributionTable;
