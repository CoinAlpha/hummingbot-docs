import React from "react";
import "./Callout.css";

import { FcInfo } from "react-icons/fc";
import { AiFillBug } from "react-icons/ai";
import { FcApproval } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { FcMenu } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";

export default function Callout(props) {
  var type = props.type === undefined ? "note" : props.type;
  var calloutType = "callout" + type;
  var linkArr = props.link;
  console.log(type);

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
    note: {
      heading: "Note: ",
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
    color: Colors[type].color,
    backgroundColor: Colors[type].backgroundColor,
    borderColor: Colors[type].borderColor,
  };

  function checkIdentifiers(propsBody) {
    var symbolCount = 0;
    let propsArr = propsBody.split("");
    propsArr.forEach(function (element) {
      if (
        element === "#" ||
        element === "`" ||
        element === "[" ||
        element === "]"
      )
        symbolCount++;
    });
    if (symbolCount % 2 !== 0) return true;
    return false;
  }
  function checkLinks(propsBody) {
    var linkSymbolCount = 0;
    let propsArr = propsBody.split("");
    propsArr.forEach(function (element) {
      if (element === "[" || element === "]") linkSymbolCount++;
    });
    if (linkSymbolCount / 2 !== linkArr.length) return true;
    return false;
  }
  function buildBody(input) {
    var arr = [];
    var tempString = "";
    var startBold = false;
    var startHighlight = false;
    var startLink = false;
    var linkCount = 0;
    var tagErrString =
      "Component Error: Please close bold and/or highlight identifier tags in input body string to correctly output body string.";
    var linkErrString =
      "Component Error: Please match correct number links for link prop.";

    if (checkIdentifiers(input) === true) {
      return tagErrString;
    }
    if (props.link) {
      if (checkLinks(input) === true) {
        return linkErrString;
      }
    }

    for (var i = 0; i < input.length; i++) {
      var thisChar = input.charAt(i);
      if (
        thisChar !== "#" &&
        thisChar !== "`" &&
        thisChar !== "[" &&
        thisChar !== "]"
      ) {
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
      } else if (thisChar === "[" && startLink === false) {
        arr.push(tempString);
        tempString = "";
        startLink = true;
      } else if (thisChar === "]" && startLink === true) {
        console.log(linkCount);
        arr.push(<a href={linkArr[linkCount]}>&nbsp;{tempString}</a>);
        linkCount++;
        tempString = "";
        startLink = false;
      }
    }
    if (tempString !== "") {
      arr.push(tempString);
    }
    return arr;
  }

  return (
    <table className="callout-table">
      <tr>
        <td>
          <div style={Style}>
            <div className="callout-top">
              <b>
                <span className="callout-icon"> {Colors[type].icon} </span>
                &nbsp;{" "}
                <span className="callout-text"> {Colors[type].heading}</span>
              </b>
            </div>
            <div className={"callout-bottom " + calloutType}>
              <span /> {buildBody(props.body)}
            </div>
          </div>
        </td>
      </tr>
    </table>
  );
}
