import React from "react";
import { Styles, Colors } from "./styles";
import "./Callout.css";

export default function Callout(props) {
  var linkCount = -1;
  const { type = "note", link: linkArr, body, bullets } = props;

  const parseText = (str) => {
    return str
      .replace(
        /`([$-/:-?{-~!"^_\]\\A-Za-z0-9\s]+)`/gi,
        '<mark class="highlight">$1</mark>'
      )
      .replace(/#([$-/:-?{-~!"^_\]\\A-Za-z0-9\s]+)#/gi, "<strong>$1</strong>")
      .replace(/\[([$-/:-?{-~!"^_\\A-Za-z0-9\s]+)\]/gi, (_, txt) => {
        linkCount++;
        return `<a href="${linkArr[linkCount]}" class="${
          linkArr[linkCount] === undefined ? "error-link" : ""
        }">&nbsp;${txt}</a>`;
      });
  };

  const BulletList = ({ list }) => {
    const bulletStr = list
      .map((text, key) => `<li key="${key}">${parseText(text)}</li>`)
      .join("");
    return (
      <div
        dangerouslySetInnerHTML={{ __html: bulletStr }}
        className="bullet-list"
      ></div>
    );
  };

  return (
    <table className="callout-table">
      <tbody>
        <tr>
          <td>
            <div style={Styles(type)}>
              <div className="callout-top">
                <b>
                  <span className="callout-icon"> {Colors[type].icon} </span>
                  <span className="callout-text"> {Colors[type].heading}</span>
                </b>
              </div>
              <div className={`callout-bottom callout${type}`}>
                {body && (
                  <div dangerouslySetInnerHTML={{ __html: parseText(body) }} />
                )}
                {bullets && <BulletList list={bullets} />}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
