import React, { useState, useContext } from "react";
import { putData, getRandomId, addHours } from "../../dynoFuncs";
import { GlobalContext } from "../../GlobalState";
import { Message } from "semantic-ui-react";

export default function AdminHourLog(props) {
  const [updateStatus, setUpdateStatus] = useState(false);
  const { currentUserInfo } = useContext(GlobalContext);

  var styles = `
  body
  {
      background: #f8edeb;
      font-family: "Century Gothic", Verdana, monospace;
      color: #1e502f;
      margin: 0px;
      font-weight: bold;
      line-height: 1;
  }

  textarea
  {
    padding: 3%;
    font-family: "Century Gothic", Verdana, monospace;
    border: none;
    border-radius: 10px;
  }
  
  
  .formtitle
  {
    padding: 1%;
    font-family: "Century Gothic", Verdana, monospace;
    font-weight: bold;
  }
  
  .dabox
  {
    display: flex;
    flex-direction: column;
    padding: 0px;
    color: #556453;
    box-shadow: 0 1px 0px 0px rgb(161, 161, 161);
    margin-right: 5%;
    margin-left: 5%;
    background-color: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(60px);
    border-radius: 10px;
  }
  
  .boxesholder
  {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
  }
  
  .boxcols
  {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
  }
  
  .lilbox
  {
      display: flex;
      flex-direction: column;
      margin: 10px;
      margin-top: 0px;
      margin-bottom: 0px;
      min-width: 170px;
  }
  
  
  .littlerbox
  {
      box-sizing: border-box;
      background-color: white;
      border-radius: 4%;
      padding: 10px;
      margin: 6px;
      margin-top: 0px;
      margin-bottom: 0px;
      border-width: 1px;
      border-color:rgb(185, 185, 185);
      color: #686868;
      font-family: "Century Gothic", Verdana, monospace;
      font-weight: bold;
      max-width: 200px;
  }
  input
  {
      font-family: "Century Gothic", Verdana, monospace;
      font-weight: bold;
      color: #686868;
      border-width: 1px;
      border-color:rgb(185, 185, 185);
      border-radius: 4%;
  }
  
  label
  {
      padding-bottom: 10px;
      color: #535e51;
  }
  
  .num
  {
      max-width: 100px;
  }
  
  #submit {
    background-color: #556453;
    border-radius: 8px;
    border-width: 1px;
    color: #FFFFFF;
    font-size: 16px;
    line-height: 10x;
    width: 100%;
    margin-bottom: 5%;
    padding: 10px;
  }

    #activityA {
      min-width: 170px;
      max-width: 200px;
      border-radius: 5px;
      border: none;
    }

    .activity {
      display: flex;
      flex-direction: column;
      width: 200px;
    }

    .date {
      display: flex;
      flex-direction: column;
      padding-bottom: 10px;
      width: 200px;
      padding: 10px;
    }

    #dateA {
      display: flex;
      flex-direction: row;
      min-width: 170px;
      max-width: 200px;
      padding: 5px;
      border-radius: 5px;
    }

  `;

  var styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
  const [allFieldsRequired, setAllFieldsRequired] = useState(false);
  const [hoursNumber, setHoursNumber] = useState(false);
  const [numVolNumber, setNumVolNumber] = useState(false);

  async function submitForm() {
    setAllFieldsRequired(false);
    setHoursNumber(false);
    setNumVolNumber(false);
    const item = {
      primary_id: getRandomId(),
      activity: document.getElementById("activityA").value,
      date: document.getElementById("dateA").value,
      supervisor: document.getElementById("supervisorA").value,
      description: document.getElementById("descriptionA").value,
      hours: document.getElementById("hoursA").value,
      volunteerCount: document.getElementById("volunteerCountA").value,
      username: "AdminLogged",
      volunteer: document.getElementById("volunteerName").value,
    };
    console.log(item);

    if (item.date === '' || item.supervisor === '' || item.description === ''
      || item.hours === '' || item.volunteerCount === '' || item.volunteer === '') {
      setAllFieldsRequired(true);
      return;
    }

    if (isNaN(parseFloat(item.hours))) {
      setHoursNumber(true);
      return;
    }
    if (isNaN(parseFloat(item.volunteerCount))) {
      setNumVolNumber(true);
      return;
    }
    document.getElementById("activityA").value = "";
    document.getElementById("dateA").value = "";
    document.getElementById("supervisorA").value = "";
    document.getElementById("descriptionA").value = "";
    document.getElementById("hoursA").value = "";
    document.getElementById("volunteerCountA").value = "";

    putData("logged_hours", item);
    props.setReloadPage(props.reloadPage + 1);
    console.log("Item in Logged Hours Admin");
    console.log(item);
  }

  return (
    <div className="dabox">
      <div>
        <h3 className="formtitle">Log Hours: </h3>
      </div>
      <div>
        <div className="boxesholder">
          <div className="boxcols">
            <div className="lilbox">
              <label>Volunteer(s): </label>
              <textarea id="volunteerName"></textarea>
            </div>
            <h1> </h1>
            <h1> </h1>
            <div className="lilbox">
              <div className="activity">
                <label for="activity">Activity:</label>
                <select name="activity" id="activityA">
                  <option value="Other">Other</option>
                  <option value="Administration">Administration</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Propagation">Propagation</option>
                  <option value="Outreach">Outreach</option>
                  <option value="Education">Education</option>
                  <option value="Garden">Garden</option>
                </select>
              </div>
            </div>
            <h1> </h1>
            <h1> </h1>
            <div className="lilbox">
              <label>Hours: </label>
              <textarea id="hoursA"></textarea>
            </div>
            <h1> </h1>
            <h1> </h1>
          </div>
          <div className="boxcols">
            <div className="lilbox">
              <label>Supervisor: </label>
              <textarea id="supervisorA"></textarea>
            </div>
            <h1> </h1>
            <h1> </h1>
            <div className="lilbox">
              <label>Number of Volunteers: </label>
              <textarea id="volunteerCountA" type="number"></textarea>
            </div>
            <h1> </h1>
            <h1> </h1>
            <div className="lilbox">
              <div className="date">
                <label>Date: </label>
                <input type="date" id="dateA" />
              </div>
            </div>
          </div>
          <div className="boxcols">
            <div className="lilbox">
              <label>Description: </label>
              <textarea
                id="descriptionA"
                rows="10"
                cols="20"
                name="text"
              ></textarea>
            </div>
            <h1> </h1>
            <h1> </h1>
            <div className="lilbox">
              <input
                id="submit"
                type="submit"
                value="Submit"
                onClick={submitForm}
              />
            </div>
          </div>
        </div>
      </div>
      {console.log("Update: " + updateStatus)}
      {allFieldsRequired && <Message negative style={{ margin: '20px' }}>
        <Message.Header

        >All fields are requried</Message.Header>
      </Message>}
      {hoursNumber && <Message negative style={{ margin: '20px' }}>
        <Message.Header>Hours must be a number</Message.Header>
      </Message>}
      {numVolNumber && <Message negative style={{ margin: '20px' }}>
        <Message.Header>Number of Volunteers must be a number</Message.Header>
      </Message>}
    </div>
  );
}
