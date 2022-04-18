import React from "react";
//import styles from "./AnnouncementForm.module.css";

export default function AnnouncementForm(props) {
  var styles = `
    #body {
      background: #f8edeb;
      font-family: "Century Gothic", Verdana, monospace;
      color: #1e502f;
      margin: 0px;
      font-weight: bold;
      line-height: 1;
    }
    
    #formtitle {
      margin: 10px;
      display: flex;
      justify-content: center;
    }
    
    #lilbox {
      display: flex;
      flex-direction: column;
      align-content: center;
      padding: 0px;
      border-radius: 5%;
      background-color: #e3e3e3;
      max-width: 250px;
      color: #556453;
      border-style: solid;
      border-width: 2px;
      border-color: #9c9c9c;
      box-shadow: 0 2px 1px 1px rgb(161, 161, 161);
    }
    
    #lilbuttons {
      display: flex;
      padding: 10px;
      flex-basis: 10px;
      justify-content: space-evenly;
    }
    
    #publish {
      font-family: "Century Gothic", Verdana, monospace;
      font-weight: bold;
      background-color: #556453;
      border-radius: 8px;
      border-width: 1px;
      color: #ffffff;
      font-size: 16px;
      line-height: 10x;
      padding: 10px;
      width: 110px;
    }
    
    .textBoxes {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10%;
    }
    
    #littlerbox {
      box-sizing: border-box;
      background-color: #e3e3e3;
      border-radius: 5%;
      padding: 10px;
      margin: 6px;
      margin-top: 0px;
      margin-bottom: 0px;
      border-width: 1px;
      color: #686868;
      font-family: "Century Gothic", Verdana, monospace;
      font-weight: bold;
      height: 250px;
      width: 238px;
      box-shadow: 0 2px 1px 1px rgb(161, 161, 161);
    } 
    #littlestbox {
      box-sizing: border-box;
      background-color: #e3e3e3;
      border-radius: 10%;
      padding: 10px;
      margin: 6px;
      margin-top: 0px;
      margin-bottom: 0px;
      border-width: 1px;
      color: #686868;
      font-family: "Century Gothic", Verdana, monospace;
      font-weight: bold;
      height: 40px;
      width: 238px;
      box-shadow: 0 2px 1px 1px rgb(161, 161, 161);
    } 
  `;

  var styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
  /*
  function eraseText() {
    document.getElementById("littlerbox").value = "";
  }
  */

  return (
    <div>
      <div id="lilbox" className={styles.lilbox}>
        <h3 id="formtitle">New Announcement </h3>
        <form action="/form/submit" method="GET">
          <div className="textboxes">
            <textarea
              id="littlestbox"
              rows="1"
              cols="100%"
              name="text"
              placeholder="Title"
            ></textarea>
            <textarea
              id="littlestbox"
              rows="1"
              cols="100%"
              name="text"
              placeholder="Poster"
            ></textarea>
            <textarea
              className={styles.littlerbox}
              id="littlerbox"
              rows="3"
              cols="100%"
              name="text"
              placeholder="Message"
            ></textarea>
            <br />
          </div>
          <div id="lilbuttons" className={styles.lilbuttons}>
            <input
              className={styles.publish}
              id="publish"
              type="submit"
              value="Publish"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
