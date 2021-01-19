import React from "react";
import "./Callout.css";

import { FcInfo } from "react-icons/fc";
import { AiFillBug } from "react-icons/ai";
import { FcApproval } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { FcMenu } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";

export default function Callout(props) {
  var calloutType = "callout" + props.type;
  const Colors = {
    success: {
      heading: "SUCCESS:",
      color: "#707070",
      backgroundColor: "#E4FFE5",
      borderColor: "#4FB916",
      icon: <FcApproval />,
    },
    warning: {
      heading: "WARNING:",
      color: "#a94442",
      backgroundColor: "#f2dede",
      borderColor: "#a94442",
      icon: <FcHighPriority />,
    },
    danger: {
      heading: "DANGER:",
      color: "#707070",
      backgroundColor: "#FEFFDC",
      borderColor: "#C6C918",
      icon: <FcMediumPriority />,
    },
    info: {
      heading: "INFO:",
      color: "#707070",
      backgroundColor: "#E7F6FF",
      borderColor: "#1A96CB",
      icon: <FcInfo />,
    },
    bug: {
      heading: "BUG:",
      color: "#707070",
      backgroundColor: "#FFF2DC",
      borderColor: "#BB8C2D ",
      icon: <AiFillBug />,
    },
    tip: {
      heading: "Tip: ",
      color: "#707070",
      backgroundColor: "#EEEEEE",
      borderColor: "#8E8E8E",
      icon: <FcMenu />,
    },
  };
  const Style = {
    borderLeft: "5px solid ",
    borderColor: "black",
    marginBottom: "20px",
    borderRadius: "4px",
    color: Colors[props.type].color,
    backgroundColor: Colors[props.type].backgroundColor,
    borderColor: Colors[props.type].borderColor,
  };

  function buildBody(input) {
    var arr = [];
    var tempString = "";
    var startBold = false;
    var startHighlight = false;
    for (var i = 0; i < input.length; i++) {
      var thisChar = input.charAt(i);
      if (thisChar !== "#" && thisChar !== "`") {
        tempString += thisChar;
      } else if (thisChar === "`" && startHighlight === false) {
        arr.push(tempString);
        tempString = "";
        startHighlight = true;
      } else if (thisChar === "`" && startHighlight === true) {
        arr.push(<mark className="highlight">{tempString}</mark>);
        tempString = "";
        startHighlight = false;
      } else if (thisChar === "#" && startBold === false) {
        arr.push(tempString);
        tempString = "";
        startBold = true;
      } else if (thisChar === "#" && startBold === true) {
        arr.push(<strong>{tempString}</strong>);
        tempString = "";
        startBold = false;
      }
    }
    if (tempString !== "") {
      arr.push(tempString);
    }
    return arr;
  }

  return (
    <table>
      <tr>
        <td>
          <div style={Style}>
            <div className="callout-top">
              <b>
                <span className="callout-icon">
                  {" "}
                  {Colors[props.type].icon}{" "}
                </span>
                &nbsp;{" "}
                <span className="callout-text">
                  {" "}
                  {Colors[props.type].heading}
                </span>
              </b>
            </div>
            <div className={"callout-bottom " + calloutType}>
              <span /> {buildBody(props.body)}
              <a href={props.link}>&nbsp;{props.linkName}.</a>
            </div>
          </div>
        </td>
      </tr>
    </table>
  );
}
