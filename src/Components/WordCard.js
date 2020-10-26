import React from "react";

export default function WordCard(props) {
  return (
    <div className={`word-container  ${props.className}`}>
      <h1 className="head-word">{props.word}</h1>
      <sub className="pr-word">
        {props.pronounce === undefined ? props.word : props.pronounce}
      </sub>
    </div>
  );
}
