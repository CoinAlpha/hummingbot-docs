import React from "react";
import "./Callout.css";

import Icons from "./components-icons/CalloutIcons";

export default function Callout(props) {
  var type = props.type === undefined ? "note" : props.type;
  var calloutType = "callout" + type;
  var linkArr = props.link;

  const Colors = {
    success: {
      heading: "SUCCESS:",
      color: "#0D999E",
      backgroundColor: "#E7F5F5",
      borderColor: "#0D999E",
      icon: <Icons type="success" />,
    },
    warning: {
      heading: "WARNING:",
      color: "#D42B21",
      backgroundColor: "#FBEAE9",
      borderColor: "#D42B21",
      icon: <Icons type="warning" />,
    },
    danger: {
      heading: "DANGER:",
      color: "#F08727",
      backgroundColor: "#FEF3E9",
      borderColor: "#F08727",
      icon: <Icons type="danger" />,
    },
    info: {
      heading: "INFO:",
      color: "#007BBD",
      backgroundColor: "#E6F2F8",
      borderColor: "#007BBD",
      icon: <Icons type="info" />,
    },
    bug: {
      heading: "BUG:",
      color: "#B86A00",
      backgroundColor: "#F8F0E6 ",
      borderColor: "#B86A00",
      icon: <Icons type="bug" />,
    },
    note: {
      heading: "NOTE: ",
      color: "#767676",
      backgroundColor: "#F1F1F1",
      borderColor: "#767676",
      icon: <Icons type="note" />,
    },
    tip: {
      heading: "TIP: ",
      color: "#7153C6",
      backgroundColor: "#F1EEF9",
      borderColor: "#7153C6",
      icon: <Icons type="tip" />,
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
