import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
export default function AudioPlayer(props) {
  if (props.audioFile !== undefined) {
    return (
      <button
        onClick={(e) => {
          var snd = new Audio(props.audioLink);
          snd.play();
        }}
        className="sub-item"
      >
        <PlayArrowIcon />
      </button>
    );
  }
  return <></>;
}
