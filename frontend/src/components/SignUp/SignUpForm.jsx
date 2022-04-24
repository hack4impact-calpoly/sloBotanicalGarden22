import React, { useState, useEffect } from "react";
import { Form, Checkbox, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { putData, getRandomId } from "../../dynoFuncs";

import "./SignUpForm.css";

import "react-datepicker/dist/react-datepicker.css";

const SignUpForm = () => {
  const [signUp, setSignUp] = useState({});
  const [signUpGroup, setSignUpGroup] = useState({});
  const [startDate, setStartDate] = useState();
  const [group, setGroup] = useState(false);
  const [indiv, setIndiv] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [correctEmailFormat, setCorrectEmailFormat] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e, { name, value }) =>
    setSignUp({ ...signUp, [name]: value });

  const handleChangeGroup = (e, { name, value }) =>
    setSignUpGroup({ ...signUpGroup, [name]: value });

  const signUpCognito = async () => {
    setPasswordsMatch(true);
    setUsernameTaken(false);
    setCorrectEmailFormat(true);
    var username = group ? signUpGroup.username : signUp.username;
    var password = group ? signUpGroup.password : signUp.password;
    var confirmPassword = group
      ? signUpGroup.confirmPassword
      : signUp.confirmPassword;
    var email = group ? signUpGroup.emailContact : signUp.email;
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
        },
      });
      setConfirmation(true);
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
      if (error.code === "UsernameExistsException") {
        setUsernameTaken(true);
      } else if (error.message === "Invalid email address format.") {
        setCorrectEmailFormat(false);
      }
    }
  };

  const confirmSignUp = async () => {
    var username = group ? signUpGroup.username : signUp.username;
    var password = group ? signUpGroup.password : signUp.password;
    var code = group ? signUpGroup.code : signUp.code;

    try {
      await Auth.confirmSignUp(username, code);
      await Auth.signIn(username, password);
      if (group) {
        var item = {
          username: signUpGroup.username,
          groupName: signUpGroup.groupName,
          nameContact: signUpGroup.nameContact,
          phoneContact: signUpGroup.phoneContact,
          emailContact: signUpGroup.emailContact,
          hourGoal: signUpGroup.hourGoal,
          totalHours: 0,
          safetyStatus: signUpGroup.safetyStatus,
        };
        console.log(item);
        putData("volunteers_group", item);
      } else {
        item = {
          Emergency_Contact_Phone: signUp.emergencyNumber,
          "Last Name": signUp.lastName,
          Covid_Waiver_and_Release: signUp.covidWaiver,
          "First Name": signUp.firstName,
          Group: signUp.groupName,
          "Total Hours Volunteered": 0,
          Emergency_Contact: signUp.emergencyName,
          Email: signUp.email,
          Birth_date: signUp.birthDate,
          is_Admin: false,
          medicalConditions: signUp.medicalConditions, //?
          "Safety Training Status": signUp.safetyStatus,
          "Photo-Permission": signUp.photoStatus,
          "Secondary Phone": signUp.phonetwo,
          "Primary Phone": signUp.phone,
          Volunter_Waiver_and_Release: signUp.volunteerWaiver,
          "Community Service": signUp.commService,
          username: signUp.username,
          hourGoal: signUp.hourGoal, //?
          mailing_address: signUp.address,
        };
        console.log(item);
        putData("volunteers_individual", item);
      }

      // push data to dynamo
      navigate("/home");
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  return (
    <Form
      className="signUpForm"
      style={{ padding: "40px", display: "flex", flexDirection: "column" }}
      onSubmit={confirmation ? confirmSignUp : signUpCognito}
    >
      <h1 style={{ color: "#4d602a" }} size="huge">
        SIGN UP
      </h1>
      <hr style={{ backgroundColor: "green", width: "100%" }} />
      {confirmation ? null : (
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
          {/* <div
            className="check-status line"
            style={{ borderLeft: "1px solid green", height: "30px" }}
          /> */}
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
      )}
      <hr style={{ backgroundColor: "green", width: "100%" }} />
      {indiv && !confirmation && (
        <div>
          <Form.Group widths="equal">
            <Form.Input
              label="Username"
              name="username"
              value={signUp.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Password"
              name="password"
              type="password"
              value={signUp.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={signUp.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
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
            <Form.Input
              label="Email"
              name="email"
              value={signUp.email}
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
            value={signUp.photoStatus}
            style={{ paddingBottom: "10px" }}
            required
            onChange={(e, data) =>
              setSignUp({ ...signUp, photoStatus: data.checked })
            }
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
          <Form.Input
            label="Secondary Phone Number"
            name="phonetwo"
            value={signUp.phonetwo}
            onChange={handleChange}
          />
          <hr style={{ backgroundColor: "green", width: "100%" }} />
          <h3 style={{ textAlign: "left" }}>Personal Information:</h3>
          <Form.Field
            required
            label="Birth Date:"
            control={DatePicker}
            selected={startDate}
            value={signUp.birthDate}
            onChange={(date) => {
              setStartDate(date);
              setSignUp({ ...signUp, birthDate: date });
            }}
          />
          <br />
          <Form.TextArea
            label="Medical Conditions"
            name="medicalConditions"
            value={signUp.medicalConditions}
            onChange={handleChange}
          />
          <Checkbox
            label="Safety Training Status Complete?"
            value={signUp.safetyStatus}
            onChange={(e, data) =>
              setSignUp({ ...signUp, safetyStatus: data.checked })
            }
          />
          <Checkbox
            label="Volunteer Waiver and Release Complete?"
            value={signUp.volunteerWaiver}
            onChange={(e, data) =>
              setSignUp({ ...signUp, volunteerWaiver: data.checked })
            }
          />
          <Checkbox
            label="Covid Waiver and Release Complete?"
            value={signUp.covidWaiver}
            onChange={(e, data) =>
              setSignUp({ ...signUp, covidWaiver: data.checked })
            }
          />
          <Checkbox
            label="Community Service?"
            value={signUp.commService}
            onChange={(e, data) =>
              setSignUp({ ...signUp, commService: data.checked })
            }
          />
          <br />
          <br />
        </div>
      )}
      {group && !confirmation && (
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
              label="Username"
              name="username"
              value={signUpGroup.username}
              onChange={handleChangeGroup}
              required
            />
            <Form.Input
              label="Password"
              name="password"
              type="password"
              value={signUpGroup.password}
              onChange={handleChangeGroup}
              required
            />
            <Form.Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={signUpGroup.confirmPassword}
              onChange={handleChangeGroup}
              required
            />
          </Form.Group>
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
            value={signUpGroup.safetyStatus}
            onChange={(e, data) =>
              setSignUp({ ...signUp, safetyStatus: data.checked })
            }
          />
        </Form>
      )}
      {confirmation && (
        <Form>
          <Form.Input
            label="Verification Code"
            name="code"
            value={group ? signUpGroup.code : signUp.code}
            onChange={group ? handleChangeGroup : handleChange}
            required
          />
        </Form>
      )}
      {usernameTaken && (
        <Message negative>
          <Message.Header>Username is already taken</Message.Header>
        </Message>
      )}
      {!passwordsMatch && (
        <Message negative>
          <Message.Header>Passwords must match</Message.Header>
        </Message>
      )}
      {!correctEmailFormat && (
        <Message negative>
          <Message.Header>Must have a valid email</Message.Header>
        </Message>
      )}
      <br />
      {(group || indiv || confirmation) && (
        <Form.Button content="Submit" onSubmit={signUpCognito} />
      )}
      {/* {confirmation && (
        <Form.Button content="Submit" onSubmit={confirmSignUp} />
      )} */}
    </Form>
  );
};

export default SignUpForm;
