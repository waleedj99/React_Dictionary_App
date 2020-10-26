import React from "react";

export default function WordMeanings(props) {
  return (
    <div className={props.className}>
      {props.meanings.map((item, index) => {
        if (index < props.limit) {
          return (
            <div key={"Mcontainer-" + index} className="meaning-container">
              <h4 key={"Hword-" + index} className="head-word">
                {item.hwi.hw}{" "}
                <i key={"Fl-" + index}>
                  (
                  {item.fl != null
                    ? item.fl
                    : item.cxs[0].cxl + item.cxs[0].cxtis[0].cxt}
                  )
                </i>
              </h4>
              <sub key={"prs-" + index} className="pr-word">
                {item.shortdef === undefined ? "" : item.shortdef}
              </sub>
            </div>
          );
        }
        return <div key={"Mcontainer-" + index}></div>;
      })}
    </div>
  );
}
