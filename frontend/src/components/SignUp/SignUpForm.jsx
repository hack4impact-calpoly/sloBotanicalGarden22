import React, { useState, useEffect } from "react";
import { Form, Checkbox } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "./SignUpForm.css";

import "react-datepicker/dist/react-datepicker.css";

const SignUpForm = ({ setNavbar }) => {
  useEffect(() => {
    setNavbar(true);
  }, []);
  const [signUp, setSignUp] = useState({});
  const [signUpGroup, setSignUpGroup] = useState({});
  const [startDate, setStartDate] = useState();
  const [group, setGroup] = useState(false);
  const [indiv, setIndiv] = useState(true);

  const handleChange = (e, { name, value }) =>
    setSignUp({ ...signUp, [name]: value });

  const handleChangeGroup = (e, { name, value }) =>
    setSignUpGroup({ ...signUpGroup, [name]: value });

  const handleSubmit = async () => {
    if (group) {
      const resp = await fetch("", {
        // Backend URL goes here
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpGroup),
      });
    } else {
      const resp = await fetch("", {
        // Backend URL goes here
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUp),
      });
    }
  };

  return (
    <div className="signUpPage">
      <Form className="signUpForm"
        style={{ padding: "40px", display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <h1 style={{ color: "#4d602a" }} size="huge">
          SIGN UP
        </h1>
        <hr style={{ backgroundColor: "green", width: "100%" }} />
        <div className="check-status">
          <Checkbox
            className="check-status indiv"
            label="Individual"
            style={{ paddingTop: "10px" }}
            onChange={() => {
              setIndiv(true);
              if (group) {
                setGroup(false);
              }
            }}
            checked={indiv}
          />
          <div
            className="check-status line"
            style={{ borderLeft: "1px solid green", height: "30px" }}
          />
          <Checkbox
            className="check-status group"
            label="Group"
            style={{ paddingTop: "10px" }}
            onChange={() => {
              setGroup(true);
              if (indiv) {
                setIndiv(false);
              }
            }}
            checked={group}
          />
        </div>
        <hr style={{ backgroundColor: "green", width: "100%" }} />
        {indiv && (
          <div>
            <Form.Group widths="equal">
              <Form.Input
                label="First Name"
                name="firstName"
                value={signUp.firstName}
                onChange={handleChange}
                required
              />
              <Form.Input
                label="Last Name"
                name="lastName"
                value={signUp.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Emergency Contact Phone Number"
                name="emergencyNumber"
                value={signUp.emergencyNumber}
                onChange={handleChange}
                required
              />
              <Form.Input
                label="Emergency Contact Name"
                name="emergencyName"
                value={signUp.emergencyName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Input
              label="Group Name"
              name="groupName"
              value={signUp.groupName}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Hour Goal"
              name="hourGoal"
              value={signUp.hourGoal}
              onChange={handleChange}
            />
            <Checkbox
              className="photo-label"
              label="Photo Permission?"
              style={{ paddingBottom: "10px" }}
              required
            />
            <hr style={{ backgroundColor: "green", width: "100%" }} />
            <Form.Input
              label="Mailing Address"
              name="address"
              value={signUp.address}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Phone Number"
              name="phone"
              value={signUp.phone}
              onChange={handleChange}
              required
            />
            <hr style={{ backgroundColor: "green", width: "100%" }} />
            <h3 style={{ textAlign: "left" }}>Personal Information:</h3>
            <Form.Field
              required
              label="Birth Date:"
              control={DatePicker}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setSignUp({ ...signUp, birthDate: date });
              }}
            />
            <br />
            <Form.TextArea label="Medical Conditions" required />
            <Checkbox
              label="Safety Training Status Complete?"
              onChange={(e, data) =>
                setSignUp({ ...signUp, safetyStatus: data.checked })
              }
            />
            <Checkbox
              label="Volunteer Waiver and Release Complete?"
              onChange={(e, data) =>
                setSignUp({ ...signUp, volunteerWaiver: data.checked })
              }
            />
            <Checkbox
              label="Covid Waiver and Release Complete?"
              onChange={(e, data) =>
                setSignUp({ ...signUp, covidWaiver: data.checked })
              }
            />
            <Checkbox
              label="Community Service?"
              onChange={(e, data) =>
                setSignUp({ ...signUp, commService: data.checked })
              }
            />
            <br />
            <br />
          </div>
        )}
        {console.log(signUp)}
        {group && (
          <Form>
            <Form.Input
              label="Group Name"
              name="groupName"
              value={signUpGroup.groupName}
              onChange={handleChangeGroup}
              required
            />
            <Form.Group widths="equal">
              <Form.Input
                label="Name of Person of Contact"
                name="nameContact"
                value={signUpGroup.nameContact}
                onChange={handleChangeGroup}
                required
              />
              <Form.Input
                label="Phone Number for Person of Contact"
                name="phoneContact"
                value={signUpGroup.phoneContact}
                onChange={handleChangeGroup}
                required
              />
              <Form.Input
                label="Email for Person of Contact"
                name="emailContact"
                value={signUpGroup.emailContact}
                onChange={handleChangeGroup}
                required
              />
            </Form.Group>
            <Form.Input
              label="Hour Goal"
              name="hourGoal"
              value={signUpGroup.hourGoal}
              onChange={handleChangeGroup}
            />
            <Checkbox
              label="Safety Training Status Complete?"
              onChange={(e, data) =>
                setSignUp({ ...signUp, safetyStatus: data.checked })
              }
            />
          </Form>
        )}
        <br />
        {(group || indiv) && (
          <Form.Button content="Submit" onSubmit={handleSubmit} />
        )}
      </Form>
    </div>
  );
};

export default SignUpForm;
