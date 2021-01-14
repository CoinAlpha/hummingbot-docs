import React from "react";
import "./Callout.css";

export default function Callout(props) {
  const Colors = {
    success: {
      heading: "SUCCESS:",
      color: "#707070",
      backgroundColor: "#E4FFE5",
      borderColor: "#4FB916",
      icon: "✅",
    },
    warning: {
      heading: "WARNING:",
      color: "#a94442",
      backgroundColor: "#f2dede",
      borderColor: "#a94442",
      icon: "❗",
    },
    danger: {
      heading: "DANGER:",
      color: "#707070",
      backgroundColor: "#FEFFDC",
      borderColor: "#C6C918",
      icon: "🚧",
    },
    info: {
      heading: "INFO:",
      color: "#707070",
      backgroundColor: "#E7F6FF",
      borderColor: "#1A96CB",
      icon: "📘",
    },
    bug: {
      heading: "BUG:",
      color: "#707070",
      backgroundColor: "#FFF2DC",
      borderColor: "#BB8C2D ",
      icon: "🐞",
    },
    quote: {
      heading: "QUOTE: ",
      color: "#707070",
      backgroundColor: "#EEEEEE",
      borderColor: "#8E8E8E",
      icon: "💬",
    },
  };
  const Style = {
    padding: "15px",
    borderLeft: "5px solid ",
    borderColor: "transparent",
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
      var nextChar = input.charAt(i + 1);
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
        <td style={Style}>
          <b>
            {" "}
            {Colors[props.type].icon} {Colors[props.type].heading}
          </b>
          <br />
          <span /> {buildBody(props.body)}
          <a href={props.link}>&nbsp;{props.linkName}.</a>
        </td>
      </tr>
    </table>
  );
}
